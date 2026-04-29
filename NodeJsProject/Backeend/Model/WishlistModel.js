const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

module.exports = WishlistModel;
