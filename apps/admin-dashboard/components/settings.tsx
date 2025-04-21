"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { SettingsContent } from "./settings-content"

export function Settings() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <SettingsContent />
      </div>
    </SidebarProvider>
  )
}
