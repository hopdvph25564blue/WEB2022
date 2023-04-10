import axios from "axios";

const token = JSON.parse(localStorage.getItem("user")) 
const instance = axios.create({

    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token?.accessToken
    },
})

export default instance