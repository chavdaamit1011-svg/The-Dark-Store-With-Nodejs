const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

// Dashboard Stats
router.get('/stats', AdminController.getDashboardStats);

// User Management
router.get('/users', AdminController.getAllUsers);
router.post('/users/status', AdminController.updateUserStatus);
router.post('/users/role', AdminController.updateUserRole);
router.post('/users/edit', AdminController.updateUserDetails);
router.delete('/users/:id', AdminController.deleteUser);

// Product Management
router.get('/products', AdminController.getAllProducts);
router.post('/products', AdminController.addProduct);
router.put('/products', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);

// Orders Management
router.get('/orders', AdminController.getAllOrders);
router.post('/orders/status', AdminController.updateOrderStatus);

// Activity Logs
router.get('/activities', AdminController.getActivityLogs);

// Live Chat
const { getAllChats, markChatRead } = require('../Controller/ChatController');
router.get('/chats', getAllChats);
router.post('/chats/read', markChatRead);

module.exports = router;
