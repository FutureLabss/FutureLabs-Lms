"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ClassroomStatus = "active" | "upcoming" | "completed"
export type StudentStatus = "active" | "inactive"

export interface Student {
  id: string
  name: string
  email: string
  progress: number
  status: StudentStatus
  lastActive: string
}

export interface Tutor {
  id: string
  name: string
  role: string
  avatar?: string
}

export interface Module {
  id: string
  title: string
  description: string
  duration: string
  materials: number
}

export interface Material {
  id: string
  title: string
  type: "pdf" | "video" | "link" | "document"
  moduleId: string
  url: string
  uploadedAt: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  moduleId: string
  totalSubmissions: number
  gradedSubmissions: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
  author: string
}

export interface Classroom {
  id: string
  title: string
  program: string
  course: string
  description: string
  status: ClassroomStatus
  startDate: string
  endDate: string
  students: Student[]
  tutors: Tutor[]
  modules: Module[]
  materials: Material[]
  assignments: Assignment[]
  announcements: Announcement[]
  nextClass?: string
  learningMaterials: number
  createdBy: string
  createdOn: string
  modifiedOn: string
}

interface ClassroomContextType {
  classrooms: Classroom[]
  filteredClassrooms: Classroom[]
  selectedClassroom: Classroom | null
  activeTab: "all" | "active" | "upcoming" | "completed"
  selectedView: "card" | "list"
  searchQuery: string
  isLoading: boolean
  isLoadingClassroom: boolean
  activeManageTab: "students" | "modules" | "materials" | "assignments" | "progress" | "announcements" | "settings"
  settingsTab: "settings" | "tutors" | "students"
  setActiveTab: (tab: "all" | "active" | "upcoming" | "completed") => void
  setSelectedView: (view: "card" | "list") => void
  setSearchQuery: (query: string) => void
  selectClassroom: (id: string | null) => void
  setActiveManageTab: (
    tab: "students" | "modules" | "materials" | "assignments" | "progress" | "announcements" | "settings",
  ) => void
  setSettingsTab: (tab: "settings" | "tutors" | "students") => void
  markAsCompleted: (id: string, completed: boolean) => void
  addStudent: (classroomId: string, student: Omit<Student, "id">) => void
  removeStudent: (classroomId: string, studentId: string) => void
  addTutor: (classroomId: string, tutor: Omit<Tutor, "id">) => void
  removeTutor: (classroomId: string, tutorId: string) => void
  addModule: (classroomId: string, module: Omit<Module, "id">) => void
  updateModule: (classroomId: string, moduleId: string, module: Partial<Module>) => void
  removeModule: (classroomId: string, moduleId: string) => void
  addMaterial: (classroomId: string, material: Omit<Material, "id" | "uploadedAt">) => void
  removeMaterial: (classroomId: string, materialId: string) => void
  addAssignment: (classroomId: string, assignment: Omit<Assignment, "id">) => void
  removeAssignment: (classroomId: string, assignmentId: string) => void
  addAnnouncement: (classroomId: string, announcement: Omit<Announcement, "id" | "createdAt">) => void
  removeAnnouncement: (classroomId: string, announcementId: string) => void
  updateClassroomSettings: (classroomId: string, settings: Partial<Classroom>) => void
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined)

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "active" | "upcoming" | "completed">("all")
  const [selectedView, setSelectedView] = useState<"card" | "list">("card")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingClassroom, setIsLoadingClassroom] = useState(false)
  const [activeManageTab, setActiveManageTab] = useState<
    "students" | "modules" | "materials" | "assignments" | "progress" | "announcements" | "settings"
  >("students")
  const [settingsTab, setSettingsTab] = useState<"settings" | "tutors" | "students">("settings")

  // Simulate fetching classrooms
  useEffect(() => {
    const fetchClassrooms = async () => {
      console.log("Starting to fetch classrooms")
      setIsLoading(true)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const mockClassrooms = [
          {
            id: "1",
            title: "UI Design Fundamentals",
            program: "UX/UI Design",
            course: "Design Basics",
            description: "A comprehensive introduction to UI design principles and practices.",
            status: "active" as ClassroomStatus,
            startDate: "2023-08-15",
            endDate: "2023-12-15",
            students: [
              {
                id: "1",
                name: "Alex Johnson",
                email: "alex.johnson@example.com",
                progress: 75,
                status: "active" as StudentStatus,
                lastActive: "Today, 2:30 PM",
              },
              {
                id: "2",
                name: "Jamie Smith",
                email: "jamie.smith@example.com",
                progress: 45,
                status: "active" as StudentStatus,
                lastActive: "Yesterday, 10:15 AM",
              },
              {
                id: "3",
                name: "Taylor Brown",
                email: "taylor.brown@example.com",
                progress: 90,
                status: "active" as StudentStatus,
                lastActive: "Today, 9:45 AM",
              },
              {
                id: "4",
                name: "Morgan Lee",
                email: "morgan.lee@example.com",
                progress: 20,
                status: "inactive" as StudentStatus,
                lastActive: "3 days ago",
              },
            ],
            tutors: [
              {
                id: "1",
                name: "Thomas Anderson",
                role: "Lead Tutor",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                id: "2",
                name: "Lisa Wong",
                role: "Assistant Tutor",
                avatar: "/placeholder.svg?height=40&width=40",
              },
            ],
            modules: [
              {
                id: "1",
                title: "Introduction to UI Design",
                description: "Learn the basics of UI design principles",
                duration: "2 weeks",
                materials: 3,
              },
              {
                id: "2",
                title: "Color Theory",
                description: "Understanding color psychology and palettes",
                duration: "1 week",
                materials: 2,
              },
              {
                id: "3",
                title: "Typography",
                description: "Exploring typefaces and text hierarchy",
                duration: "1 week",
                materials: 1,
              },
            ],
            materials: [
              {
                id: "1",
                title: "UI Design Principles PDF",
                type: "pdf" as const,
                moduleId: "1",
                url: "#",
                uploadedAt: "2023-08-16",
              },
              {
                id: "2",
                title: "Introduction to Design Systems",
                type: "video" as const,
                moduleId: "1",
                url: "#",
                uploadedAt: "2023-08-17",
              },
            ],
            assignments: [
              {
                id: "1",
                title: "Design a Mobile App Interface",
                description: "Create a mobile app interface based on the provided requirements",
                dueDate: "2023-09-15",
                moduleId: "1",
                totalSubmissions: 20,
                gradedSubmissions: 15,
              },
            ],
            announcements: [
              {
                id: "1",
                title: "Welcome to UI Design Fundamentals",
                content:
                  "Welcome to the course! Please review the syllabus and introduce yourself in the discussion forum.",
                createdAt: "2023-08-15",
                author: "Thomas Anderson",
              },
            ],
            nextClass: "Tomorrow, 2:00 PM",
            learningMaterials: 6,
            createdBy: "Thomas Anderson",
            createdOn: "2023-07-01",
            modifiedOn: "2023-08-05",
          },
          {
            id: "2",
            title: "Frontend Development 101",
            program: "Web Development",
            course: "Frontend Basics",
            description: "Learn the fundamentals of frontend web development.",
            status: "active" as ClassroomStatus,
            startDate: "2023-08-15",
            endDate: "2023-12-15",
            students: [
              {
                id: "5",
                name: "Jordan Rivers",
                email: "jordan.rivers@example.com",
                progress: 65,
                status: "active" as StudentStatus,
                lastActive: "Today, 1:15 PM",
              },
              {
                id: "6",
                name: "Casey Kim",
                email: "casey.kim@example.com",
                progress: 80,
                status: "active" as StudentStatus,
                lastActive: "Yesterday, 4:30 PM",
              },
            ],
            tutors: [
              {
                id: "3",
                name: "Michael Chen",
                role: "Lead Tutor",
                avatar: "/placeholder.svg?height=40&width=40",
              },
            ],
            modules: [
              {
                id: "4",
                title: "HTML Basics",
                description: "Introduction to HTML structure and elements",
                duration: "2 weeks",
                materials: 4,
              },
              {
                id: "5",
                title: "CSS Fundamentals",
                description: "Styling web pages with CSS",
                duration: "2 weeks",
                materials: 4,
              },
            ],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "Tomorrow, 2:00 PM",
            learningMaterials: 8,
            createdBy: "Michael Chen",
            createdOn: "2023-07-05",
            modifiedOn: "2023-08-01",
          },
          {
            id: "3",
            title: "Design Systems Workshop",
            program: "UX/UI Design",
            course: "Advanced Design",
            description: "Learn how to create and implement design systems.",
            status: "active" as ClassroomStatus,
            startDate: "2023-08-15",
            endDate: "2023-10-15",
            students: [],
            tutors: [],
            modules: [],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "",
            learningMaterials: 4,
            createdBy: "Lisa Wong",
            createdOn: "2023-07-10",
            modifiedOn: "2023-07-15",
          },
          {
            id: "4",
            title: "React Advanced Patterns",
            program: "Web Development",
            course: "Advanced React",
            description: "Explore advanced React patterns and best practices.",
            status: "upcoming" as ClassroomStatus,
            startDate: "2023-09-01",
            endDate: "2023-12-01",
            students: [],
            tutors: [],
            modules: [],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "",
            learningMaterials: 6,
            createdBy: "Michael Chen",
            createdOn: "2023-07-20",
            modifiedOn: "2023-07-25",
          },
          {
            id: "5",
            title: "Mobile App Development",
            program: "Mobile Development",
            course: "iOS Development",
            description: "Learn to build iOS applications with Swift.",
            status: "completed" as ClassroomStatus,
            startDate: "2023-01-15",
            endDate: "2023-05-15",
            students: [],
            tutors: [],
            modules: [],
            materials: [],
            assignments: [],
            announcements: [],
            nextClass: "",
            learningMaterials: 10,
            createdBy: "Sarah Johnson",
            createdOn: "2022-12-15",
            modifiedOn: "2023-05-20",
          },
        ]

        console.log("Setting classrooms:", mockClassrooms)
        setClassrooms(mockClassrooms)
        console.log("Classrooms set successfully")
      } catch (error) {
        console.error("Error fetching classrooms:", error)
      } finally {
        setIsLoading(false)
        console.log("Finished loading classrooms")
      }
    }

    fetchClassrooms()
  }, [])

  // Filter classrooms based on active tab and search query
  const filteredClassrooms = classrooms.filter((classroom) => {
    // Filter by tab
    if (activeTab !== "all" && classroom.status !== activeTab) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        classroom.title.toLowerCase().includes(query) ||
        classroom.program.toLowerCase().includes(query) ||
        classroom.course.toLowerCase().includes(query)
      )
    }

    return true
  })

  const selectClassroom = async (id: string | null) => {
    if (!id) {
      setSelectedClassroom(null)
      return
    }

    setIsLoadingClassroom(true)

    // If classrooms haven't been loaded yet, wait for them
    if (isLoading) {
      // Wait for classrooms to load
      await new Promise((resolve) => {
        const checkIfLoaded = () => {
          if (!isLoading) {
            resolve(true)
          } else {
            setTimeout(checkIfLoaded, 100)
          }
        }
        checkIfLoaded()
      })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const classroom = classrooms.find((c) => c.id === id) || null
    setSelectedClassroom(classroom)
    setIsLoadingClassroom(false)
  }

  const markAsCompleted = (id: string, completed: boolean) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === id) {
          return {
            ...classroom,
            status: completed ? "completed" : "active",
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === id) {
      setSelectedClassroom({
        ...selectedClassroom,
        status: completed ? "completed" : "active",
      })
    }
  }

  const addStudent = (classroomId: string, student: Omit<Student, "id">) => {
    const newStudent = {
      ...student,
      id: Math.random().toString(36).substring(2, 9),
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            students: [...classroom.students, newStudent],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        students: [...selectedClassroom.students, newStudent],
      })
    }
  }

  const removeStudent = (classroomId: string, studentId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            students: classroom.students.filter((student) => student.id !== studentId),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        students: selectedClassroom.students.filter((student) => student.id !== studentId),
      })
    }
  }

  const addTutor = (classroomId: string, tutor: Omit<Tutor, "id">) => {
    const newTutor = {
      ...tutor,
      id: Math.random().toString(36).substring(2, 9),
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            tutors: [...classroom.tutors, newTutor],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        tutors: [...selectedClassroom.tutors, newTutor],
      })
    }
  }

  const removeTutor = (classroomId: string, tutorId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            tutors: classroom.tutors.filter((tutor) => tutor.id !== tutorId),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        tutors: selectedClassroom.tutors.filter((tutor) => tutor.id !== tutorId),
      })
    }
  }

  const addModule = (classroomId: string, module: Omit<Module, "id">) => {
    const newModule = {
      ...module,
      id: Math.random().toString(36).substring(2, 9),
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            modules: [...classroom.modules, newModule],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        modules: [...selectedClassroom.modules, newModule],
      })
    }
  }

  const updateModule = (classroomId: string, moduleId: string, module: Partial<Module>) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            modules: classroom.modules.map((m) => (m.id === moduleId ? { ...m, ...module } : m)),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        modules: selectedClassroom.modules.map((m) => (m.id === moduleId ? { ...m, ...module } : m)),
      })
    }
  }

  const removeModule = (classroomId: string, moduleId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            modules: classroom.modules.filter((module) => module.id !== moduleId),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        modules: selectedClassroom.modules.filter((module) => module.id !== moduleId),
      })
    }
  }

  const addMaterial = (classroomId: string, material: Omit<Material, "id" | "uploadedAt">) => {
    const today = new Date().toISOString().split("T")[0]
    const newMaterial = {
      ...material,
      id: Math.random().toString(36).substring(2, 9),
      uploadedAt: today,
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            materials: [...classroom.materials, newMaterial],
            learningMaterials: classroom.learningMaterials + 1,
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        materials: [...selectedClassroom.materials, newMaterial],
        learningMaterials: selectedClassroom.learningMaterials + 1,
      })
    }
  }

  const removeMaterial = (classroomId: string, materialId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            materials: classroom.materials.filter((material) => material.id !== materialId),
            learningMaterials: classroom.learningMaterials - 1,
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        materials: selectedClassroom.materials.filter((material) => material.id !== materialId),
        learningMaterials: selectedClassroom.learningMaterials - 1,
      })
    }
  }

  const addAssignment = (classroomId: string, assignment: Omit<Assignment, "id">) => {
    const newAssignment = {
      ...assignment,
      id: Math.random().toString(36).substring(2, 9),
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            assignments: [...classroom.assignments, newAssignment],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        assignments: [...selectedClassroom.assignments, newAssignment],
      })
    }
  }

  const removeAssignment = (classroomId: string, assignmentId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            assignments: classroom.assignments.filter((assignment) => assignment.id !== assignmentId),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        assignments: selectedClassroom.assignments.filter((assignment) => assignment.id !== assignmentId),
      })
    }
  }

  const addAnnouncement = (classroomId: string, announcement: Omit<Announcement, "id" | "createdAt">) => {
    const today = new Date().toISOString().split("T")[0]
    const newAnnouncement = {
      ...announcement,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: today,
    }

    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            announcements: [...classroom.announcements, newAnnouncement],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        announcements: [...selectedClassroom.announcements, newAnnouncement],
      })
    }
  }

  const removeAnnouncement = (classroomId: string, announcementId: string) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            announcements: classroom.announcements.filter((announcement) => announcement.id !== announcementId),
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        announcements: selectedClassroom.announcements.filter((announcement) => announcement.id !== announcementId),
      })
    }
  }

  const updateClassroomSettings = (classroomId: string, settings: Partial<Classroom>) => {
    setClassrooms(
      classrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            ...settings,
            modifiedOn: new Date().toISOString().split("T")[0],
          }
        }
        return classroom
      }),
    )

    if (selectedClassroom && selectedClassroom.id === classroomId) {
      setSelectedClassroom({
        ...selectedClassroom,
        ...settings,
        modifiedOn: new Date().toISOString().split("T")[0],
      })
    }
  }

  return (
    <ClassroomContext.Provider
      value={{
        classrooms,
        filteredClassrooms,
        selectedClassroom,
        activeTab,
        selectedView,
        searchQuery,
        isLoading,
        isLoadingClassroom,
        activeManageTab,
        settingsTab,
        setActiveTab,
        setSelectedView,
        setSearchQuery,
        selectClassroom,
        setActiveManageTab,
        setSettingsTab,
        markAsCompleted,
        addStudent,
        removeStudent,
        addTutor,
        removeTutor,
        addModule,
        updateModule,
        removeModule,
        addMaterial,
        removeMaterial,
        addAssignment,
        removeAssignment,
        addAnnouncement,
        removeAnnouncement,
        updateClassroomSettings,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  )
}

export function useClassrooms() {
  const context = useContext(ClassroomContext)
  if (context === undefined) {
    throw new Error("useClassrooms must be used within a ClassroomProvider")
  }
  return context
}
