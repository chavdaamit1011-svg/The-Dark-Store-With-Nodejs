import React, { useState } from 'react'
import axios from "axios"

export default function Login() {
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    const [showForgot, setShowForgot] = useState(false)
    const [step, setStep] = useState(1)

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:8024/login", formData)

            if (res.data.success) {
                alert("Login Successful ✅")
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendOtp = async () => {
        try {
            const res = await axios.post("http://localhost:8024/forgot-password", { email })
            alert(res.data.message)

            if (res.data.success) {
                setStep(2)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyOtpFunc = async () => {
        try {
            const res = await axios.post("http://localhost:8024/verify-otp", { email, otp })
            alert(res.data.message)

            if (res.data.success) {
                setStep(3)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updatePasswordFunc = async () => {
        try {
            const res = await axios.post("http://localhost:8024/update-password", {
                email,
                newPassword
            })
            alert(res.data.message)

            if (res.data.success) {
                setShowForgot(false)
                setStep(1)
                setEmail("")
                setOtp("")
                setNewPassword("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {!showForgot ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    <br /><br />

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            style={{ paddingRight: '30px' }}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <br /><br />

                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    {step === 1 && (
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br /><br />
                            <button onClick={sendOtp}>Send OTP</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <br /><br />
                            <button onClick={verifyOtpFunc}>Verify OTP</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ paddingRight: '30px' }}
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    {showNewPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            <br /><br />
                            <button onClick={updatePasswordFunc}>Update Password</button>
                        </div>
                    )}
                </div>
            )}

            <br />
            <button onClick={() => setShowForgot(true)}>Forgot Password</button>
        </div>
    )
}