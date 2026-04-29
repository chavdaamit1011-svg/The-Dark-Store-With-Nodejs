import axios from "axios";

const Api = axios.create({
    baseURL: "https://the-dark-store-with-nodejs-1.onrender.com"
})

export default Api