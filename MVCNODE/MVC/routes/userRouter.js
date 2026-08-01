const express = require("express")
const {addUSer,login,verifyToken,deleteUser,updateUser,getUsers, Home} = require("../controller/userController")
const auth = require("../midlewear/auth")

const u_Router = express.Router()

u_Router.post("/add", addUSer)
u_Router.post("/login", login)
u_Router.post("/verifyToken", verifyToken)
u_Router.get("/get", getUsers)
u_Router.delete("/delete/:id", deleteUser)
u_Router.patch("/update/:id", updateUser)
u_Router.get("/", verifyToken,auth,Home)

module.exports = u_Router

