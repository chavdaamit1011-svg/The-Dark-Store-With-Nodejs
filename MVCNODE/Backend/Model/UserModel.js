const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    image: String

})

const usermodel = mongoose.model("user", userSchema)

module.exports = usermodel