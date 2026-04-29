const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        selectedSize: {
            type: String,
            default: "M"
        },
        selectedColor: {
            type: String,
            default: "Standard"
        }
    }]
}, { timestamps: true });

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
