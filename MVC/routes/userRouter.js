const express = require("express")
const addUser = require("../controller/userController")

const u_Router = express.Router()

u_Router.post("/add", addUser)

module.exports = u_Router

