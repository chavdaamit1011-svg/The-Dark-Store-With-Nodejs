import axios from "axios";

const Api = axios.create({
    // baseURL: "https://the-dark-store-with-nodejs-1.onrender.com" // Live server
    baseURL: "http://localhost:8024" // Local server
})

export default Api