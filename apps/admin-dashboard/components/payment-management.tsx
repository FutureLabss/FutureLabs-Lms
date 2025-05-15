"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { PaymentManagementContent } from "./payment-management-content"

export function PaymentManagement() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <PaymentManagementContent />
      </div>
    </SidebarProvider>
  )
}
