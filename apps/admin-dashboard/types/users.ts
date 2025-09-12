export type UserRole = "student" | "tutor" | "admin";
export type UserStatus = "active" | "suspended" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  program: string;
  joined: string;
  status: UserStatus;
}

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  searchUsers: (query: string) => User[];
  filterUsersByRole: (role: UserRole | "all") => User[];
  filterUsersByStatus: (status: UserStatus | "all") => User[];
  editUser: (id: string, user: Partial<User>) => Promise<void>;
}
