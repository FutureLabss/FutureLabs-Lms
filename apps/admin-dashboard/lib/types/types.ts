export type UserRole = "student" | "tutor" | "admin";
export type UserStatus = "active" | "suspended" | "pending";

export interface User {
  fullname?: string;
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  program: string;
  joined: string;
  status: UserStatus;
  avatar?: string;
  bio?: string;
  title?: string;
  phone?: string;
  image?: string;
  surname: string;
  first_name: string;
  gender: string;
  state: string;
  lga: string;
  course: string;
  roles: Role[];
}
export interface Role {
  id: number;
  name: string;
}
