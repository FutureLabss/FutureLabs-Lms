// // services/userService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { apiClient } from "@/lib/api-client";

import { GetUsersRespones } from "@/lib/types/get-ussers";
import { User } from "@/lib/types/types";

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem("token"); // or from cookies/context

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export async function getUsers(): Promise<GetUsersRespones> {
  const Promise = apiClient.get<GetUsersRespones>("users").then((respones) => {
    console.log("Response from getUsers:", respones);
    return respones;
  });
  return Promise;
}
export async function getUser(id: string): Promise<User> {
  const res = await apiClient.get<User>(`users/${id}`);
  console.log("API Respones:", res);
  console.log("User Data:", res.fullname);
  return res;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  console.log("Payload:", user);

  const res = await apiClient.post<User>("users", user).then((respones) => {
    return respones;
  });
  return res;
}

export async function updateUser(
  id: string,
  user: Partial<User>
): Promise<User> {
  console.log("Response from updateUsers:", user);

  const response = await apiClient.put<User>(`/users/${id}`, user);
  return response;
}

export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(`users/${id}`);
  return response;
}
