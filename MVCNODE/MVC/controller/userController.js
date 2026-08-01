const userModel = require("../useModel/userModel")
const jwt = require("jsonwebtoken")

const addUSer = async (req, res) => {
    const { username, password, role } = req.body
    const data = await userModel.create({
        username: username,
        password: password,
        role: role || "user"
    })
    res.send(data)
}

const getUsers = async (req, res) => {
    const data = await userModel.find()
    res.send(data)
}

const updateUser = async (req, res) => {
    const data = await userModel.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
}

const deleteUser = async (req, res) => {
    const data = await userModel.findByIdAndDelete(req.params.id)
    res.send(data)
}

const login = async (req, res) => {
    const { username, password, role } = req.body
    const user = await userModel.findOne({ username })

    if (!user) {
        return res.send("User not found")
    }
    else if (user.password !== password) {
        return res.send("Invalid password")
    }
    else {
        let payload = {
            username: user.username,
            password: user.password,
            role: user.role
        }
        const info = jwt.sign(payload, "secretkey")
        res.send(info)
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const info = jwt.verify(token, "secretkey")
        console.log(info);
        req.user = info
        next()
    } catch (error) {
        res.send("Invalid token")
    }
}

const Home = (req, res) => {
    res.send("home")
}

module.exports = { addUSer, getUsers, updateUser, deleteUser, login, verifyToken, Home }