"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { NotificationsContent } from "./notifications-content"
import { NotificationsProvider } from "./notifications-provider"

export function Notifications() {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <NotificationsContent />
        </div>
      </SidebarProvider>
    </NotificationsProvider>
  )
}
