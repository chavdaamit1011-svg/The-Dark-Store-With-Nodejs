require("dotenv").config();
const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const db = require("./config/db")
const signupModel = require("./Model/SignupModel")
const productmodel = require("./Model/ProductModel")
const productdata = require("./ProductsData/Products")
const u_route = require("./Routes/UserRoutes")
const admin_route = require("./Routes/AdminRoutes")
const product = require("./ProductsData/Products")
const ChatModel = require("./Model/ChatModel")

app.use(cors())
app.use(express.json())
app.use(u_route)
app.use("/admin", admin_route)

// ─── Socket.io Setup ─────────────────────────────────────────────────────────
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id)

    // User joins their own room (by email)
    socket.on("join_room", (email) => {
        socket.join(email)
        console.log(`👤 User ${email} joined room`)
    })

    // Admin joins the admin room
    socket.on("join_admin", () => {
        socket.join("admin_room")
        console.log("👑 Admin joined admin room")
    })

    // User sends message
    socket.on("user_message", async (data) => {
        const { userEmail, userName, text } = data
        try {
            const msg = { from: "user", text, time: new Date() }

            // Save to DB
            await ChatModel.findOneAndUpdate(
                { userEmail },
                {
                    $push: { messages: msg },
                    $set: { userName, updatedAt: new Date(), isRead: false }
                },
                { upsert: true, new: true }
            )

            // Broadcast to admin room
            io.to("admin_room").emit("new_user_message", {
                userEmail,
                userName,
                message: msg
            })
        } catch (err) {
            console.error("Error saving user message:", err)
        }
    })

    // Admin sends reply
    socket.on("admin_reply", async (data) => {
        const { userEmail, text } = data
        try {
            const msg = { from: "admin", text, time: new Date() }

            // Save to DB
            await ChatModel.findOneAndUpdate(
                { userEmail },
                {
                    $push: { messages: msg },
                    $set: { updatedAt: new Date(), isRead: true }
                }
            )

            // Send reply only to that user's room
            io.to(userEmail).emit("admin_message", { message: msg })
        } catch (err) {
            console.error("Error saving admin reply:", err)
        }
    })

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id)
    })
})

// ─── Seed Data ────────────────────────────────────────────────────────────────
const insertData = async () => {
    try {
        await productmodel.deleteMany({}) // Clear existing data to apply new structure
        await productmodel.insertMany(productdata)
        console.log("🔥 Data Refreshed & Inserted Successfully")
    } catch (err) {
        console.log("❌ Error refreshing data:", err)
    }
}
// Run refresh and start server only when DB is connected
const path = require("path")

const frontendDistPath = path.join(__dirname, "../Frontend/dist")
app.use(express.static(frontendDistPath))

app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"))
})

const PORT = process.env.PORT || 8024

db.once("open", async () => {
    try {
        await insertData()
    } catch (err) {
        console.error("Error refreshing DB seed data:", err)
    }

    server.listen(PORT, () => {
        console.log(`server chalu 🤝 with Socket.io on port ${PORT}`)
    })
})

db.on("error", (err) => {
    console.error("MongoDb error after initial connection:", err)
})
