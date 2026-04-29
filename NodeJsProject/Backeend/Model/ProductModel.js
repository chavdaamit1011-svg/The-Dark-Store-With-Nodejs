const mongoose = require("mongoose")
const { schema } = require("./SignupModel")

const productschema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    subcategory: String,
    image: [String],
    description: { type: String, default: "This is a premium product from The Dark Store. High quality materials, elegant design, and long-lasting durability make it a perfect choice." }
})

const productmodel = mongoose.model("Product",productschema)

module.exports=productmodel