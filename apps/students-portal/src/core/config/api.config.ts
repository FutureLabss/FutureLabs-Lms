import axios from "axios";

// Initialize axios defaults
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.withCredentials = false;
axios.defaults.headers.common["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;

// Function to get token from localStorage
const getTokenFromLocalStorage = (): string | null => {
  try {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) return null;

    const parsed = JSON.parse(tokenData);
    return parsed?.data?.token || null;
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    return null;
  }
};

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for handling token refresh or errors)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized request - possibly invalid token");
      // You might want to clear the token here if it's invalid
      // localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

// Your existing setToken function
export function setToken(token: string): void {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export default axios;
