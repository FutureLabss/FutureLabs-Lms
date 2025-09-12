import { apiClient } from "@/lib/api-client";
import { Role, User } from "@/lib/types/types";

type LoginResponse = {
  message: string;
  data: {
    token: string;
    fullname: string;
    roles: Role[];
    profile_id: number;
  };
  // user: User;
};

export interface LogoutResponse {
  success: Boolean;
  message: string;
  data: string[];
}

class AuthService {
  async login(email: string, password: string): Promise<User> {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/login', { email, password })
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      console.log("Login response", response);

      const { fullname, roles, profile_id, token } = response.data;

      const user: User = {
        fullname,
        roles,
        profile_id,
        id: "",
        name: "",
        email: "",
        role: "student",
        program: "",
        joined: "",
        status: "active",
      };

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred during login";
      throw new Error(message);
    }
  }

  async logout(): Promise<void> {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/logout')
    try {
      await apiClient.post<LogoutResponse>("/auth/logout");
      console.log(apiClient);

      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred during logout";
      throw new Error(message);
    }

    // For demo purposes, we'll just clear localStorage
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     localStorage.removeItem("auth_token");
    //     localStorage.removeItem("user");
    //     resolve();
    //   }, 500);
    // });
  }

  async getCurrentUser(): Promise<User> {
    // In a real app, this would make an API call
    // return apiClient.get('/auth/me')

    // try {
    //   const response = await apiClient.get<User>('/auth/me');
    //   return response;
    // } catch (error: any) {
    //   const message =
    //     error.response?.data?.message || 'Failed to fetch current user';
    //   throw new Error(message);
    // }

    // For demo purposes, we'll check localStorage
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem("auth_token");
        const userJson = localStorage.getItem("user");

        if (token && userJson) {
          resolve(JSON.parse(userJson));
        } else {
          reject(new Error("Not authenticated"));
        }
      }, 500);
    });
  }
}

export const authService = new AuthService();
