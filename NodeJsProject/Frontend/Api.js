import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.29.237:8024"
})

export default Api