const SignupModel = require("../Model/SignupModel");
const ProductModel = require("../Model/ProductModel");
const OrderModel = require("../Model/OrderModel");
const ActivityLogModel = require("../Model/ActivityLogModel");

// Dashboard Stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await SignupModel.countDocuments();
        const totalProducts = await ProductModel.countDocuments();
        const totalOrders = await OrderModel.countDocuments();

        // Basic mock data for the graph (Revenue / Activity)
        const graphData = [
            { name: 'Jan', users: 10, sales: 5000 },
            { name: 'Feb', users: 20, sales: 15000 },
            { name: 'Mar', users: 15, sales: 12000 },
            { name: 'Apr', users: totalUsers, sales: 25000 }
        ];

        res.status(200).json({
            success: true,
            stats: { totalUsers, totalProducts, totalOrders },
            graphData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching stats" });
    }
};

// Users Management
const getAllUsers = async (req, res) => {
    try {
        const users = await SignupModel.find({}, '-password').sort({ _id: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await SignupModel.findByIdAndUpdate(id, { status });
        res.status(200).json({ success: true, message: `User status changed to ${status}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user status" });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        await SignupModel.findByIdAndUpdate(id, { role });
        res.status(200).json({ success: true, message: `User role changed to ${role}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user role" });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const { id, name, email } = req.body;
        await SignupModel.findByIdAndUpdate(id, { name, email });
        res.status(200).json({ success: true, message: "User details updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user details" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await SignupModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};

// Products Management
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().sort({ _id: -1 });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, category, subcategory, image, description } = req.body;
        const newProduct = new ProductModel({ name, price, category, subcategory, image, description });
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding product" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id, name, price, category, subcategory, image, description } = req.body;
        await ProductModel.findByIdAndUpdate(id, { name, price, category, subcategory, image, description });
        res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

// Orders Management
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('items.product').sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await OrderModel.findByIdAndUpdate(orderId, { status });
        
        // Log activity
        if (req.body.adminEmail) {
            await ActivityLogModel.create({
                userEmail: req.body.adminEmail,
                action: "Order Updated",
                details: `Changed status of Order ${orderId} to ${status}`
            });
        }

        res.status(200).json({ success: true, message: `Order status updated to ${status}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};

// Activity Logs
const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLogModel.find().sort({ timestamp: -1 }).limit(100);
        res.status(200).json({ success: true, logs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching activity logs" });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers, updateUserStatus, updateUserRole, updateUserDetails, deleteUser,
    getAllProducts, addProduct, updateProduct, deleteProduct,
    getAllOrders, updateOrderStatus,
    getActivityLogs
};
