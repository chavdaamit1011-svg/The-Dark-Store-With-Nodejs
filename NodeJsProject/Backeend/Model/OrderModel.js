const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        selectedSize: String,
        selectedColor: String,
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    deliveryDetails: {
        fullName: String,
        address: String,
        city: String,
        pincode: String,
        phone: String
    },
    paymentDetails: {
        transactionId: String,
        method: String,
        status: { type: String, default: "Success" }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
