const ChatModel = require("../Model/ChatModel");

const getChatHistory = async (req, res) => {
    try {
        const { email } = req.params;
        let chat = await ChatModel.findOne({ userEmail: email });
        if (!chat) {
            return res.json({ success: true, messages: [] });
        }
        res.json({ success: true, messages: chat.messages });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching chat" });
    }
};

const getAllChats = async (req, res) => {
    try {
        const chats = await ChatModel.find().sort({ updatedAt: -1 });
        res.json({ success: true, chats });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching chats" });
    }
};

const markChatRead = async (req, res) => {
    try {
        const { email } = req.body;
        await ChatModel.findOneAndUpdate({ userEmail: email }, { isRead: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

module.exports = { getChatHistory, getAllChats, markChatRead };
