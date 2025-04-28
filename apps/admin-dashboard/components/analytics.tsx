"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { AnalyticsContent } from "./analytics-content"

export function Analytics() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <AnalyticsContent />
      </div>
    </SidebarProvider>
  )
}
