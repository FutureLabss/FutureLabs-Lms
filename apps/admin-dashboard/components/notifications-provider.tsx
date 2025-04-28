"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Notification } from "./notification-item"

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void
  markAsRead: (id: string) => void
  clearAll: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New course published",
    description: "The course 'Advanced React Patterns' has been published.",
    time: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "New student enrolled",
    description: "John Doe has enrolled in 'JavaScript Fundamentals'.",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: "user",
  },
  {
    id: "3",
    title: "Assignment deadline approaching",
    description: "The deadline for 'React Hooks' assignment is tomorrow.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "New message from instructor",
    description: "You have a new message from Sarah regarding your progress.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    type: "message",
  },
  {
    id: "5",
    title: "System maintenance",
    description: "The system will be under maintenance on Sunday, 2AM-4AM.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "system",
  },
]

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const addNotification = (notification: Omit<Notification, "id" | "time" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      time: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markAsRead, clearAll }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
