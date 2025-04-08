"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Plus, Search } from "lucide-react"
import Link from "next/link"
import { CreateClassModal } from "@/components/create-class-modal"

// Mock data for classes
const initialClasses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    program: "High School",
    students: 15,
    nextSession: "Today, 4:00 PM",
    status: "active",
  },
  {
    id: 2,
    name: "Introduction to Physics",
    program: "Middle School",
    students: 12,
    nextSession: "Tomorrow, 2:30 PM",
    status: "active",
  },
  {
    id: 3,
    name: "Chemistry Fundamentals",
    program: "High School",
    students: 10,
    nextSession: "Wednesday, 3:15 PM",
    status: "active",
  },
  {
    id: 4,
    name: "Biology 101",
    program: "Middle School",
    students: 18,
    nextSession: "Friday, 1:00 PM",
    status: "active",
  },
  {
    id: 5,
    name: "English Literature",
    program: "High School",
    students: 14,
    nextSession: "Monday, 11:30 AM",
    status: "inactive",
  },
]

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Function to add a new class to the list
  const handleClassCreated = (newClass: any) => {
    setClasses([newClass, ...classes])
  }

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.program.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Class
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search classes..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        {["all", "active", "inactive"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClasses
                .filter((cls) => tabValue === "all" || cls.status === tabValue)
                .map((cls) => (
                  <Card key={cls.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{cls.name}</CardTitle>
                        <CardDescription>{cls.program}</CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          cls.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {cls.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{cls.nextSession}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{cls.students} students</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/classes/${cls.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {filteredClasses.filter((cls) => tabValue === "all" || cls.status === tabValue).length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-muted-foreground">No classes found</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create a Class
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Create Class Modal */}
      <CreateClassModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onClassCreated={handleClassCreated}
      />
    </div>
  )
}
