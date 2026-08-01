const mongoose = require("mongoose")

const ProductsData = new mongoose.Schema({
    title: {
        type: String
    },
    Price: {
        type: Number
    }
})

const Productsmodel = mongoose.model("Products", ProductsData)

module.exports = Productsmodel