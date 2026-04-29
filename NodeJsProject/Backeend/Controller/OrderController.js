const OrderModel = require("../Model/OrderModel");
const CartModel = require("../Model/CartModel");
const ActivityLogModel = require("../Model/ActivityLogModel");

// Create Order (Simulated Checkout)
const createOrder = async (req, res) => {
    try {
        const { userEmail, items, totalAmount, deliveryDetails, paymentDetails } = req.body;

        // Generate fake transaction ID if not provided
        const transactionId = paymentDetails?.transactionId || `pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

        const newOrder = new OrderModel({
            userEmail,
            items,
            totalAmount,
            deliveryDetails,
            paymentDetails: { ...paymentDetails, transactionId }
        });

        await newOrder.save();

        // Log activity
        await ActivityLogModel.create({
            userEmail,
            action: "Order Placed",
            details: `Order placed for ₹${totalAmount} via ${paymentDetails?.method || 'Card'}`
        });

        // Clear user's cart
        await CartModel.findOneAndUpdate({ userEmail }, { items: [] });

        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
};

// Get User's Orders
const getUserOrders = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await OrderModel.find({ userEmail: email })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

// Get Single Order By ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id).populate("items.product");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Get Order By ID Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch order details" });
    }
};

module.exports = { createOrder, getUserOrders, getOrderById };
