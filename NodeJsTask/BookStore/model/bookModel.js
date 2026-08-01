const mongoose = require("mongoose")

const bookschema = new mongoose.Schema({
    Bookname: {
        type: String
    },
    Author: {
        type: String
    },
    PublishDate: {
        type: String
    },
    Price: {
        type: Number
    },

})

const bookmodel = mongoose.model("book", bookschema)

module.exports = bookmodel