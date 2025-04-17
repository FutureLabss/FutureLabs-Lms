"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "student" | "tutor" | "admin"
export type UserStatus = "active" | "suspended" | "pending"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  program: string
  joined: string
  status: UserStatus
}

interface UserContextType {
  users: User[]
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  searchUsers: (query: string) => User[]
  filterUsersByRole: (role: UserRole | "all") => User[]
  filterUsersByStatus: (status: UserStatus | "all") => User[]
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      program: "UI/UX Design",
      joined: "6/15/2023",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "tutor",
      program: "Software Development",
      joined: "5/20/2023",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      role: "student",
      program: "Data Science",
      joined: "7/10/2023",
      status: "suspended",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "admin",
      program: "All Programs",
      joined: "4/5/2023",
      status: "active",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "tutor",
      program: "Digital Marketing",
      joined: "8/1/2023",
      status: "pending",
    },
  ])

  const addUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: Math.random().toString(36).substring(2, 9),
    }
    setUsers([...users, newUser])
  }

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const searchUsers = (query: string) => {
    if (!query) return users
    const lowercaseQuery = query.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.program.toLowerCase().includes(lowercaseQuery),
    )
  }

  const filterUsersByRole = (role: UserRole | "all") => {
    if (role === "all") return users
    return users.filter((user) => user.role === role)
  }

  const filterUsersByStatus = (status: UserStatus | "all") => {
    if (status === "all") return users
    return users.filter((user) => user.status === status)
  }

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        searchUsers,
        filterUsersByRole,
        filterUsersByStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider")
  }
  return context
}
