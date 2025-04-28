"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { UserManagementContent } from "./user-management-content"
import { UserProvider } from "./user-provider"

export function UserManagement() {
  return (
    <SidebarProvider>
      <UserProvider>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <UserManagementContent />
        </div>
      </UserProvider>
    </SidebarProvider>
  )
}
