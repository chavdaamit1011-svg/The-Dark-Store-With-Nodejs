const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/BookStore")

const db = mongoose.connection

db.on("connected", () => {
    console.log("MongoDB connected");
})

module.exports = db