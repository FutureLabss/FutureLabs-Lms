"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardContent } from "./dashboard-content"

export function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  )
}
