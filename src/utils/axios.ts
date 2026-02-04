import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_BACKEND_URL,
  withCredentials: true,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use((response) => response.data);
