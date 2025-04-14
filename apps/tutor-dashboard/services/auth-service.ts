import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/types";





// Mock user data for demo purposes
// const MOCK_USER: User = {
//   id: "1",
//   name: "John Doe",
//   email: "tutor@example.com",
//   role: "tutor",
//   avatar: "/placeholder.svg",
// };

interface Role {
  id: number;
  name: string;
}

export interface UserData {
  fullname: string;
  roles: Role[];
  profile_id: number;
  email?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    fullname: string;
    roles: Role[];
    profile_id: number;
  };
}

export interface LogoutResponse {
  success: Boolean;
  message: string;
  data: string[];

}



class AuthService {
  async login(email: string, password: string): Promise<UserData> {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/login', { email, password })
    try {

      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      const { fullname, roles, profile_id, token } = response.data;

      const user: UserData = {
        fullname,
        roles,
        profile_id,
      };

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;

    } catch (error: any) {
      const message =
        error.response?.data?.message || 'An error occurred during login';
      throw new Error(message);
    }
  }
  // For demo purposes, we'll use mock data
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (email === "tutor@example.com" && password === "password123") {
  //       // Store auth token in localStorage
  //       localStorage.setItem("auth_token", "mock_jwt_token");
  //       localStorage.setItem("user", JSON.stringify(MOCK_USER));
  //       resolve(MOCK_USER);
  //     } else {
  //       reject(new Error("Invalid credentials"));
  //     }
  //   }, 1000);
  // });

  async logout(): Promise<void> {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/logout')
    try {

      await apiClient.post<LogoutResponse>('/auth/logout');
      console.log(apiClient);

      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'An error occurred during logout';
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

// Add a method to update a class
export const updateClass = async (classId: string, classData: any) => {
  try {
    // In a real app, you would make an API call here
    // const response = await apiClient.put(`/classes/${classId}`, classData);
    // return response.data;

    // For now, we'll simulate a successful update
    return { success: true, data: classData };
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};
