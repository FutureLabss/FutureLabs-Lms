"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Check, Info, MessageSquare, User, AlertTriangle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface Notification {
  id: string
  title: string
  description: string
  time: Date
  read: boolean
  type: "info" | "message" | "user" | "warning" | "system"
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const [isHovering, setIsHovering] = useState(false)

  const getIcon = () => {
    switch (notification.type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "user":
        return <User className="h-4 w-4 text-purple-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 p-3 transition-colors",
        !notification.read && "bg-muted/50",
        isHovering && "bg-muted",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>{notification.title}</p>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(notification.time, { addSuffix: true })}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{notification.description}</p>
      </div>
      {!notification.read && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onMarkAsRead(notification.id)}
        >
          <Check className="h-3 w-3 mr-1" />
          Mark read
        </Button>
      )}
    </div>
  )
}
