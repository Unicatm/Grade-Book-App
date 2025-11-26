import axios from "axios";
import { useAuthStore } from "../stores/auth";

const BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    if (error.response && [401, 403].includes(error.response.status)) {
      console.log("Invalid or expired token.");
      authStore.logoutUser();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
