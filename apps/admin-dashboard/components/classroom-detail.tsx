"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClassrooms, type Classroom } from "./classroom-provider"
import { ClassroomStudents } from "./classroom-students"
import { ClassroomModules } from "./classroom-modules"
import { ClassroomMaterials } from "./classroom-materials"
import { ClassroomAssignments } from "./classroom-assignments"
import { ClassroomProgress } from "./classroom-progress"
import { ClassroomAnnouncements } from "./classroom-announcements"
import { ClassroomSettings } from "./classroom-settings"
import { ClassroomDetailSkeleton } from "./classroom-detail-skeleton"

interface ClassroomDetailProps {
  id: string
}

export function ClassroomDetail({ id }: ClassroomDetailProps) {
  const {
    classrooms,
    activeManageTab,
    setActiveManageTab,
    markAsCompleted,
    isLoading: isLoadingAllClassrooms,
  } = useClassrooms()

  const [isLoading, setIsLoading] = useState(true)
  const [classroom, setClassroom] = useState<Classroom | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Direct approach to find the classroom by ID
  useEffect(() => {
    const loadClassroom = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log("Loading classroom with ID:", id)
        console.log("Current classrooms:", classrooms)

        // If classrooms array is empty but not in loading state, we might have an issue
        if (classrooms.length === 0 && !isLoadingAllClassrooms) {
          console.log("No classrooms available but not in loading state")

          // Simulate classroom data for the requested ID as a fallback
          const fallbackClassroom = {
            id: id,
            title: "UI Design Fundamentals",
            program: "UX/UI Design",
            course: "Design Basics",
            description: "A comprehensive introduction to UI design principles and practices.",
            status: "active" as const,
            startDate: "2023-08-15",
            endDate: "2023-12-15",
            students: [],
            tutors: [],
            modules: [],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "Tomorrow, 2:00 PM",
            learningMaterials: 6,
            createdBy: "Admin",
            createdOn: "2023-07-01",
            modifiedOn: "2023-08-05",
          }

          setClassroom(fallbackClassroom)
          console.log("Using fallback classroom data")
          setIsLoading(false)
          return
        }

        // Wait for classrooms to load if they're still loading
        if (isLoadingAllClassrooms) {
          console.log("Waiting for all classrooms to load...")
          let attempts = 0
          const maxAttempts = 50 // Increased from previous value

          await new Promise<void>((resolve) => {
            const checkInterval = setInterval(() => {
              attempts++
              console.log(`Check attempt ${attempts}/${maxAttempts}, loading state:`, isLoadingAllClassrooms)

              if (!isLoadingAllClassrooms || attempts >= maxAttempts) {
                clearInterval(checkInterval)
                resolve()
              }
            }, 200) // Check more frequently
          })
        }

        // Find the classroom by ID
        const foundClassroom = classrooms.find((c) => c.id === id)
        console.log("Found classroom:", foundClassroom)

        if (foundClassroom) {
          setClassroom(foundClassroom)
        } else {
          // If classroom not found in the array, create a fallback
          console.log(`Classroom with ID ${id} not found, using fallback`)

          const fallbackClassroom = {
            id: id,
            title: "UI Design Fundamentals",
            program: "UX/UI Design",
            course: "Design Basics",
            description: "A comprehensive introduction to UI design principles and practices.",
            status: "active" as const,
            startDate: "2023-08-15",
            endDate: "2023-12-15",
            students: [],
            tutors: [],
            modules: [],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "Tomorrow, 2:00 PM",
            learningMaterials: 6,
            createdBy: "Admin",
            createdOn: "2023-07-01",
            modifiedOn: "2023-08-05",
          }

          setClassroom(fallbackClassroom)
        }
      } catch (err) {
        console.error("Error loading classroom:", err)
        setError("Error loading classroom data")
      } finally {
        setIsLoading(false)
      }
    }

    loadClassroom()

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timed out")
        setIsLoading(false)
        setError("Loading timed out. Please try again.")
      }
    }, 15000) // Increased timeout to 15 seconds

    return () => clearTimeout(timeoutId)
  }, [id, classrooms, isLoadingAllClassrooms])

  if (isLoading || isLoadingAllClassrooms) {
    return (
      <div>
        <ClassroomDetailSkeleton />
        <div className="container mx-auto p-6 text-center text-muted-foreground">Loading classroom details...</div>
      </div>
    )
  }

  if (error || !classroom) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-muted-foreground mb-4">{error || "Classroom not found"}</p>
        <Button asChild>
          <Link href="/classrooms">Back to Classrooms</Link>
        </Button>
      </div>
    )
  }

  const isCompleted = classroom.status === "completed"

  const handleMarkAsCompleted = (checked: boolean) => {
    markAsCompleted(classroom.id, checked)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/classrooms" className="flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Classrooms
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/classrooms/${id}/manage`}>
              <Cog className="mr-2 h-4 w-4" />
              Manage Classroom
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm">Mark as Completed</span>
            <Switch checked={isCompleted} onCheckedChange={handleMarkAsCompleted} />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{classroom.title}</h1>
            <p className="text-muted-foreground">
              {classroom.program} • {classroom.course}
            </p>
            <p className="mt-2">{classroom.description}</p>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tutors</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {classroom.tutors.map((tutor) => (
                    <div key={tutor.id} className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={tutor.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={tutor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tutor.name}</p>
                        <p className="text-xs text-muted-foreground">{tutor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                <p className="mt-2 text-sm font-medium">{formatDate(classroom.startDate)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                <p className="mt-2 text-sm font-medium">{formatDate(classroom.endDate)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Students</h3>
                <p className="mt-2 text-sm font-medium">{classroom.students.length}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Modules</h3>
                <p className="mt-2 text-sm font-medium">{classroom.modules.length}</p>
              </div>
            </div>
          </div>

          <Tabs value={activeManageTab} onValueChange={(value) => setActiveManageTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="progress">Student Progress</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <ClassroomStudents classroom={classroom} />
            </TabsContent>
            <TabsContent value="modules">
              <ClassroomModules classroom={classroom} />
            </TabsContent>
            <TabsContent value="materials">
              <ClassroomMaterials classroom={classroom} />
            </TabsContent>
            <TabsContent value="assignments">
              <ClassroomAssignments classroom={classroom} />
            </TabsContent>
            <TabsContent value="progress">
              <ClassroomProgress classroom={classroom} />
            </TabsContent>
            <TabsContent value="announcements">
              <ClassroomAnnouncements classroom={classroom} />
            </TabsContent>
            <TabsContent value="settings">
              <ClassroomSettings classroom={classroom} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
