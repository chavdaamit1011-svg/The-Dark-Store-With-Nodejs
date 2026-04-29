const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: { type: String, enum: ["user", "admin"], required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, unique: true },
    userName: { type: String, default: "Guest" },
    messages: [messageSchema],
    isRead: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);
