"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { SystemSettingsContent } from "./system-settings-content"

export function SystemSettings() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <SystemSettingsContent />
      </div>
    </SidebarProvider>
  )
}
