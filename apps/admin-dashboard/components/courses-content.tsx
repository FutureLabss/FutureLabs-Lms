"use client"

import { useState } from "react"
import { Bell, Search, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCourses } from "./course-provider"
import { CourseTable } from "./course-table"
import { CourseDetails } from "./course-details"
import { CourseAnalytics } from "./course-analytics"
import { AddCourseDialog } from "./add-course-dialog"

export function CoursesContent() {
  const { selectedTab, setSelectedTab, selectedCourse, selectCourse, isLoading } = useCourses()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)

  const handleTabChange = (value: string) => {
    setSelectedTab(value as "all" | "details" | "analytics")
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
              <h1 className="text-2xl font-bold tracking-tight">Pre-Recorded Courses</h1>
              <p className="text-muted-foreground">Manage your courses, modules, videos and assignments</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button onClick={() => setIsAddCourseOpen(true)} disabled={isLoading}>
                <Plus className="mr-2 h-4 w-4" />
                New Course
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="all" value={selectedTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="details" disabled={!selectedCourse}>
                  Course Details
                </TabsTrigger>
                <TabsTrigger value="analytics" disabled={!selectedCourse}>
                  Analytics
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <CourseTable searchQuery={searchQuery} />
              </TabsContent>
              <TabsContent value="details">{selectedCourse && <CourseDetails />}</TabsContent>
              <TabsContent value="analytics">{selectedCourse && <CourseAnalytics />}</TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <AddCourseDialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen} />
    </div>
  )
}
