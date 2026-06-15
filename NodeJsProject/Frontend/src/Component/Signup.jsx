import React, { useState } from 'react'
import Api from '../../Api'

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Api.post("/register", formData)
            alert(res.data.message)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <br /><br />

                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <br /><br />

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} style={{ paddingRight: '30px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
                <br /><br />

                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}