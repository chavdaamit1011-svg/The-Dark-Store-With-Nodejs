import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? "http://localhost:8024" : "" 
})

export default Api