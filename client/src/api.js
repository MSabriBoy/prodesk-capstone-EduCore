import axios from "axios";


const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;


const API = axios.create({
  baseURL: BASE_URL
});


// Attach token to every request
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }

);


export default API;