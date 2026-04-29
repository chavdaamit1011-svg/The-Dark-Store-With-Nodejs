import React, { useState } from 'react'
import axios from "axios"

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:8024/register", formData)
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

                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <br /><br />

                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}