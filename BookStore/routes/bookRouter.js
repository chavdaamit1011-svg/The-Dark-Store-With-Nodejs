const express = require("express")

const { addbook, getbook, updatebook, deletebook } = require("../controller/bookController")

const bookroute = express.Router()

bookroute.post("/add", addbook)
bookroute.get("/get", getbook)
bookroute.patch("/update/:id", updatebook)
bookroute.delete("/delete/:id", deletebook)

module.exports = bookroute