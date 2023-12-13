import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL : "https://minhhoang-dev-blog-app.herokuapp.com/api/"
    baseURL: process.env.REACT_APP_TEST_API_URL
})