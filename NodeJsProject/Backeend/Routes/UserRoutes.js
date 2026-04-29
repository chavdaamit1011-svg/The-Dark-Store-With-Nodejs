const express = require("express")
const { register, login, resetpass, verifyOtp, updatePassword } = require("../Controller/UserController")

const u_route = express.Router()



u_route.post("/register", register)
u_route.post("/login", login)
u_route.post("/forgot-password", resetpass)
u_route.post("/verify-otp", verifyOtp)
u_route.post("/update-password", updatePassword)

const productmodel = require("../Model/ProductModel")
const { Getcategory, getsubcategory, getSingleProduct } = require("../Controller/ProductController")

u_route.get("/category/:cat",Getcategory)
u_route.get("/product/:id",getSingleProduct)
u_route.post("/subcategory/:sub",getsubcategory)

u_route.post("/fetchsub/:sub", getsubcategory)

const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require("../Controller/CartController");
const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } = require("../Controller/WishlistController");
const { createOrder, getUserOrders, getOrderById } = require("../Controller/OrderController");
const { createOrder: createRazorpayOrder, verifyPayment } = require("../Controller/PaymentController");

// Cart Routes
u_route.get("/cart/:email", getCart);
u_route.post("/cart/add", addToCart);
u_route.post("/cart/update", updateCartItem);
u_route.post("/cart/remove", removeFromCart);
u_route.post("/cart/clear", clearCart);

// Wishlist Routes
u_route.get("/wishlist/:email", getWishlist);
u_route.post("/wishlist/add", addToWishlist);
u_route.post("/wishlist/remove", removeFromWishlist);
u_route.post("/wishlist/clear", clearWishlist);

// Order Routes
u_route.post("/order/create", createOrder);
u_route.get("/order/user/:email", getUserOrders);
u_route.get("/order/:id", getOrderById);

// Payment Routes
u_route.post("/payment/create-order", createRazorpayOrder);
u_route.post("/payment/verify", verifyPayment);

// Chat History
const { getChatHistory } = require("../Controller/ChatController");
u_route.get("/chat/:email", getChatHistory);

module.exports = u_route