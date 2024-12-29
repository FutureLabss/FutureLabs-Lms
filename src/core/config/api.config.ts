import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://futurelabs-manager-be.onrender.com/api/v1";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;

export function setToken(token: string): void {
  if (token) {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  }
}
