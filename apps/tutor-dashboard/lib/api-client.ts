import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

// Create a class for the API client
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL, 

      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem("auth_token")

        // If token exists, add it to the headers
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => Promise.reject(error),
    )

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle authentication errors
        if (error.response?.status === 401) {
          // Clear local storage
          localStorage.removeItem("auth_token")
          localStorage.removeItem("user")

          // Redirect to login page if not already there
          if (window.location.pathname !== "/login") {
            window.location.href = "/login"
          }
        }

        return Promise.reject(error)
      },
    )
  }

  // Generic GET method
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  // Generic POST method
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  // Generic PUT method
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  // Generic DELETE method
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
