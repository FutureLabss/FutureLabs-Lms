"use client"

import { useState } from "react"
import { Bell, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClassrooms } from "./classroom-provider"
import { ClassroomGrid } from "./classroom-grid"
import { ClassroomList } from "./classroom-list"
import { CreateClassroomDialog } from "./create-classroom-dialog"

export function ClassroomsContent() {
  const { activeTab, setActiveTab, selectedView, setSelectedView, searchQuery, setSearchQuery, isLoading } =
    useClassrooms()

  const [isCreateClassroomOpen, setIsCreateClassroomOpen] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "active" | "upcoming" | "completed")
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full bg-muted pl-8 md:w-[240px] lg:w-[320px]" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium md:inline-block">Admin</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Classrooms</h1>
              <p className="text-muted-foreground">Manage your classrooms, students, and learning materials</p>
            </div>
            <Button onClick={() => setIsCreateClassroomOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Classroom
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Classrooms</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classrooms..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex border rounded-md">
                  <Button
                    variant={selectedView === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setSelectedView("card")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant={selectedView === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setSelectedView("list")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>

            {selectedView === "card" ? <ClassroomGrid /> : <ClassroomList />}
          </div>
        </div>
      </main>

      <CreateClassroomDialog open={isCreateClassroomOpen} onOpenChange={setIsCreateClassroomOpen} />
    </div>
  )
}
