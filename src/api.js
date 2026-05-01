import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://fsad-backend-reliefconnect.onrender.com/api",
});

export default api;
