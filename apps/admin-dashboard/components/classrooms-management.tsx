"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { ClassroomsContent } from "./classrooms-content"
import { ClassroomProvider } from "./classroom-provider"

export function ClassroomsManagement() {
  return (
    <SidebarProvider>
      <ClassroomProvider>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <ClassroomsContent />
        </div>
      </ClassroomProvider>
    </SidebarProvider>
  )
}
