import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://futurelabs-manager-be-api.onrender.com/api/v1";
const API_KEY = "NKa4Do2rjKnhYhmHHXIyw9nGEG3o7fNvCGoS9s0VFRQ";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = false;
axios.defaults.headers.common["x-api-key"] = API_KEY;

export function setToken(token: string): void {
  if (token) {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  }
}
