import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL : "https://minhhoang-dev-blog-app.herokuapp.com/api/"
    baseURL: "http://localhost:5000/api/"
})