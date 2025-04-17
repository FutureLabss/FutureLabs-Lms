"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { ResourcesContent } from "./resources-content"

export function Resources() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <ResourcesContent />
      </div>
    </SidebarProvider>
  )
}
