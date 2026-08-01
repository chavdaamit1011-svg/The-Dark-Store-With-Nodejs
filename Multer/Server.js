const express = require("express")
const app = express()
app.use(express.json())
// app.set("view engine", "ejs")
const db = require("./Config/db")
const userModel = require("./Model/usermodel")
const multer = require("multer")
const path = require("path")
app.use(express.static("public"))
app.use("/upload", express.static(path.join(__dirname, "upload")))
const fs = require("fs")
const cors = require("cors")
app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname)
    // }

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage }).single("image")

app.post('/insertData', upload, async (req, res) => {
    const { username, password } = req.body
    let image = ""
    if (req.file) {
        image = req.file.path
    }
    const data = await userModule.create({
        username: username,
        password: password,
        image: image
    })
    console.log(data)
    res.json(data)

})

app.get("/show", async (req, res) => {
    const data = await userModule.find({})
    res.send(data)
})


app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userModule.findByIdAndDelete(id);

        if (user && user.image && fs.existsSync(user.image)) {
            fs.unlinkSync(user.image);
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/update/:id', async (req, res) => {
    const data = await userModule.findById(req.params.id)
    if (!data) {


        return res.send("User not found")
    }
    console.log(data)
    res.render('edit', { data })
})

app.post('/update/:id', upload, async (req, res) => {
    const user = await userModule.findById(req.params.id)
    console.log(user)

    const updateData = {
        username: req.body.username,
        password: req.body.password,
        // image:req.file.
    }

    if (req.file) {
        if (user.image && fs.existsSync(user.image)) {
            fs.unlinkSync(user.image)
        }
        updateData.image = req.file.path
    }

    await userModule.findByIdAndUpdate(req.params.id, updateData)
    res.redirect('/')
})


app.listen(5001, () => {
    console.log("server listen")
})