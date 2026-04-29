const mongoose = require("mongoose")

const SignupSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
    },
    role: {
        type: String,
        default: "User"
    },
    password: String,
    otp: Number,
    otpExpire: Date,
    status: {
        type: String,
        enum: ["Active", "Blocked"],
        default: "Active"
    }
})

const signupModel = mongoose.model("SignUp", SignupSchema)

module.exports = signupModel