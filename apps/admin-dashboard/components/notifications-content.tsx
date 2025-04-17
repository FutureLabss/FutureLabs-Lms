"use client"

import { useState } from "react"
import { Bell, Check, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications } from "./notifications-provider"
import { NotificationItem } from "./notification-item"
import { UserProfileDropdown } from "./user-profile-dropdown"

export function NotificationsContent() {
  const { notifications, markAsRead, clearAll } = useNotifications()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUnreadNotifications = unreadNotifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredReadNotifications = readNotifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getNotificationsToDisplay = () => {
    switch (activeTab) {
      case "unread":
        return filteredUnreadNotifications
      case "read":
        return filteredReadNotifications
      default:
        return filteredNotifications
    }
  }

  const handleMarkAllAsRead = () => {
    unreadNotifications.forEach((notification) => {
      markAsRead(notification.id)
    })
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            className="w-full bg-muted pl-8 md:w-[240px] lg:w-[320px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserProfileDropdown />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Manage your notifications and alerts</p>
            </div>
            <div className="flex gap-2">
              {unreadNotifications.length > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark all as read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" onClick={clearAll}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear all
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    {filteredNotifications.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    {filteredUnreadNotifications.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="read">
                  Read
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                    {filteredReadNotifications.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Notifications</CardTitle>
                    <CardDescription>View all your notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {getNotificationsToDisplay().length > 0 ? (
                        getNotificationsToDisplay().map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Bell className="h-12 w-12 text-muted-foreground/50" />
                          <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "You're all caught up!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unread" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Unread Notifications</CardTitle>
                    <CardDescription>View your unread notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {getNotificationsToDisplay().length > 0 ? (
                        getNotificationsToDisplay().map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Bell className="h-12 w-12 text-muted-foreground/50" />
                          <h3 className="mt-4 text-lg font-medium">No unread notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "You're all caught up!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="read" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Read Notifications</CardTitle>
                    <CardDescription>View your previously read notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {getNotificationsToDisplay().length > 0 ? (
                        getNotificationsToDisplay().map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Bell className="h-12 w-12 text-muted-foreground/50" />
                          <h3 className="mt-4 text-lg font-medium">No read notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "You haven't read any notifications yet"}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
