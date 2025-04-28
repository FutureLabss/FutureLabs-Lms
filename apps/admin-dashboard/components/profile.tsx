"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { ProfileContent } from "./profile-content"

export function Profile() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <ProfileContent />
      </div>
    </SidebarProvider>
  )
}
