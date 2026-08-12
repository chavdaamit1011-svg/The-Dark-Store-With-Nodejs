const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI || process.env.MONGODB_ATLAS_URI

if (!mongoURI) {
    console.error("MongoDb connection failed: MONGO_URI or MONGODB_ATLAS_URI is not defined in .env")
    process.exit(1)
}

mongoose.connect(mongoURI)
    .catch((err) => {
        console.error("MongoDb initial connection error:", err)
        if (err.message && err.message.toLowerCase().includes("authentication failed")) {
            console.error("Mongo auth failed. Verify Mongo URI username/password and Atlas IP access settings.")
        }
        process.exit(1)
    })

const db = mongoose.connection

db.on("connected", () => {
    console.log("MongoDb Connected💀")
})

db.on("error", (err) => {
    console.error("MongoDb connection error:", err)
})

module.exports = db