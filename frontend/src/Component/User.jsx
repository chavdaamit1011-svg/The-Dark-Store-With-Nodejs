import React, { useState, useEffect } from "react";
import axios from "axios";

function User() {

    const [formData, setFormData] = useState({
        name: "",

        password: "",
        image: null
    });

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        if (e.target.name === "file") {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    // Insert Data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("username", formData.name);
        data.append("password", formData.password);
        data.append("image", formData.image);

        try {
            await axios.post("http://localhost:5001/insertData", data);
            
            fetchUsers(); // refresh data
        } catch (error) {
            console.error(error);
        }
    };

    // Get Data
    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5001/show");
        setUsers(res.data);
    };

    const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/delete/${id}`);
    fetchUsers(); 
  } catch (error) {
    console.log(error);
  }
};

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <br /><br />

                

                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <br /><br />

                File:
                <input type="file" name="file" onChange={handleChange} />
                <br /><br />

                <button type="submit">Submit</button>
            </form>

            <hr />

            <h2>User Data</h2>

            {users.map((user) => (
                <div key={user._id}>

                    <p>Name: {user.username}</p>
                    <p>Password: {user.password}</p>

                    <img
                        src={`http://localhost:5001/${user.image}`}
                        width="200"
                        alt="user"
                    />
                    <br />
                    
                    <button onClick={() => deleteUser(user._id)}>
                        Delete
                    </button>

                    <hr />

                </div>
            ))}

        </div>
    );
}

export default User;