const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ActivityLogModel = mongoose.model("ActivityLog", ActivityLogSchema);
module.exports = ActivityLogModel;
