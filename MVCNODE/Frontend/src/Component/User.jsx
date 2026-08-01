import React from 'react'
import { useState } from 'react'
import axios from "axios"
export default function User() {

    const [Form, setForm] = useState({
        name: "",
        password: "",
        image: null
    })

    const [Users, setUsers] = useState()

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setForm({
                ...Form,
                image: e.target.files[0]
            })
        } else {
            setForm({
                ...Form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", Form.name);
        data.append("password", Form.password);
        data.append("image", Form.image);

        try {
            await axios.post("http://localhost:6002/insertData", data);

            fetchUsers(); // refresh data
        } catch (error) {
            console.error(error);
        }

    }

    //  useEffect(() => {
    //     fetchUsers();
    // }, []);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:6002/show");
        setUsers(res.data);
    };

    // const deleteUser = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:6002/delete/${id}`);
    //         fetchUsers();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };




    return (
        <div>

            <form onSubmit={handleSubmit}>

                <input type="name" name="name" placeholder="Name" onChange={handleChange} />
                <input type="password" name="password" placeholder="Enter the Password" onChange={handleChange} />
                <input type="file" name="image" onChange={handleChange} />
                <button>submit</button>
            </form>
        </div>
    )
}
