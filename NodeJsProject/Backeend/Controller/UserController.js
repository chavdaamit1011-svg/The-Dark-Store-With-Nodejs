const signupModel = require("../Model/SignupModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const ActivityLogModel = require("../Model/ActivityLogModel")

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const oldUser = await signupModel.findOne({ email })
        if (oldUser) {
            return res.json({ success: false, message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        let assignedRole = "User";
        if (email.toLowerCase().includes("admin")) {
            assignedRole = "Admin";
        }

        const data = await signupModel.create({
            name,
            email,
            password: hashedPassword,
            role: assignedRole
        })

        await ActivityLogModel.create({
            userEmail: email,
            action: "Register",
            details: `New account created as ${assignedRole}`
        })

        res.json({
            success: true,
            message: "Registration successful",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        const { name, password } = req.body

        const user = await signupModel.findOne({ name })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        if (user.status === "Blocked") {
            return res.json({ success: false, message: "Your account has been blocked by the Admin." })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            await ActivityLogModel.create({
                userEmail: user.email,
                action: "Login",
                details: "User logged in successfully"
            })

            res.json({ 
                success: true, 
                message: "Login successful", 
                user: { name: user.name, email: user.email, role: user.role || "User" } 
            })
        } else {
            res.json({ success: false, message: "Invalid password" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

// FORGOT PASSWORD - SEND OTP
const resetpass = async (req, res) => {
    try {
        const { email } = req.body

        const user = await signupModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000)
        user.otp = otp
        user.otpExpire = Date.now() + 60000 // 1 Minute validity (60,000 ms)
        await user.save()

        const smtpUser = process.env.BREVO_SMTP_USER || process.env.EMAIL_USER
        const smtpPass = process.env.BREVO_SMTP_PASS || process.env.EMAIL_PASS
        const useBrevo = Boolean(process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASS)

        if (!smtpUser || !smtpPass) {
            console.error("SMTP credentials missing. Set BREVO_SMTP_USER/BREVO_SMTP_PASS or EMAIL_USER/EMAIL_PASS in .env")
            return res.json({ success: false, message: "SMTP settings are not configured." })
        }

        const transporter = nodemailer.createTransport(useBrevo ? {
            host: 'smtp-relay.brevo.com',
            port: 2525,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        } : {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        })

        const mailoption = {
            from: `"The Dark Store" <${smtpUser}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `<h3>Your OTP is: ${otp}</h3>`
        }

        transporter.sendMail(mailoption, (err, info) => {
            if (err) {
                console.error("Error sending password reset mail:", err)
                return res.json({ success: false, message: "Error sending mail" })
            } else {
                console.log("Password reset OTP sent:", info.response || info)
                return res.json({ success: true, message: "OTP sent successfully" })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

// VERIFY OTP
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await signupModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        // Check expiration
        if (!user.otpExpire || Date.now() > user.otpExpire) {
            user.otp = null
            user.otpExpire = null
            await user.save()
            return res.json({ success: false, message: "OTP has expired. Please request a new one." })
        }

        if (user.otp !== Number(otp)) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        return res.json({ success: true, message: "OTP verified" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

// UPDATE PASSWORD
const updatePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        const user = await signupModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.otp = null
        user.otpExpire = null

        await user.save()

        res.json({ success: true, message: "Password reset successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

module.exports = { register, login, resetpass, verifyOtp, updatePassword }