"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { UserManagementContent } from "./user-management-content";
import { UserTable } from "./user-table";
import { useUsers } from "@/hooks/useUsers";
export function UserManagement() {
  const { data, loading, error } = useUsers();

  return (
    <main>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <UserManagementContent />
        </div>
      </SidebarProvider>
      {/* {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div>Failed to load users</div>
      ) : (
        <UserTable users={data?.data || []} />
      )} */}
    </main>
  );
}
