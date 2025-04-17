"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { CoursesContent } from "./courses-content"
import { CourseProvider } from "./course-provider"

export function CoursesManagement() {
  return (
    <SidebarProvider>
      <CourseProvider>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <CoursesContent />
        </div>
      </CourseProvider>
    </SidebarProvider>
  )
}
