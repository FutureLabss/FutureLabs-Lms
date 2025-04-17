"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Module {
  id: string
  title: string
  description: string
  videos: Video[]
}

export interface Video {
  id: string
  title: string
  moduleId: string
  duration: string
  views: number
  completions: number
}

export interface Course {
  id: string
  title: string
  program: string
  branch: string
  description: string
  students: number
  modules: Module[]
  completion: string
  views: number
}

interface CourseContextType {
  courses: Course[]
  selectedCourse: Course | null
  selectedTab: "all" | "details" | "analytics"
  analyticsFilter: number
  isLoading: boolean
  isLoadingCourse: boolean
  isLoadingAnalytics: boolean
  addCourse: (course: Omit<Course, "id" | "modules" | "completion" | "views">) => void
  updateCourse: (id: string, course: Partial<Course>) => void
  deleteCourse: (id: string) => void
  selectCourse: (id: string | null) => void
  setSelectedTab: (tab: "all" | "details" | "analytics") => void
  setAnalyticsFilter: (days: number) => void
  searchCourses: (query: string) => Course[]
  addModule: (courseId: string, module: Omit<Module, "id" | "videos">) => void
  updateModule: (courseId: string, moduleId: string, module: Partial<Module>) => void
  deleteModule: (courseId: string, moduleId: string) => void
  addVideo: (courseId: string, moduleId: string, video: Omit<Video, "id" | "moduleId">) => void
  updateVideo: (courseId: string, videoId: string, video: Partial<Video>) => void
  deleteVideo: (courseId: string, videoId: string) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedTab, setSelectedTab] = useState<"all" | "details" | "analytics">("all")
  const [analyticsFilter, setAnalyticsFilter] = useState<number>(30)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCourse, setIsLoadingCourse] = useState(false)
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false)

  // Simulate fetching courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCourses([
        {
          id: "1",
          title: "UI/UX Design Fundamentals",
          program: "UI/UX Design",
          branch: "N/A",
          description: "A comprehensive introduction to the fundamental principles of UI/UX design.",
          students: 42,
          modules: [
            {
              id: "1",
              title: "Introduction to UI/UX Principles",
              description: "Learn the foundational principles of user-centered design.",
              videos: [
                {
                  id: "1",
                  title: "Introduction to UI/UX Principles",
                  moduleId: "1",
                  duration: "25:30",
                  views: 85,
                  completions: 70,
                },
                {
                  id: "2",
                  title: "Understanding User-Centered Design",
                  moduleId: "1",
                  duration: "18:45",
                  views: 75,
                  completions: 65,
                },
              ],
            },
            {
              id: "2",
              title: "User Research Methods",
              description: "Explore various methods for gathering user insights.",
              videos: [
                {
                  id: "3",
                  title: "User Research Fundamentals",
                  moduleId: "2",
                  duration: "22:15",
                  views: 62,
                  completions: 55,
                },
              ],
            },
          ],
          completion: "120/210",
          views: 320,
        },
        {
          id: "2",
          title: "Advanced UI Patterns",
          program: "UI/UX Design",
          branch: "Interface Design",
          description: "Explore advanced UI patterns and their implementation in modern interfaces.",
          students: 35,
          modules: [
            {
              id: "3",
              title: "Modern UI Patterns",
              description: "Learn about modern UI patterns and their applications.",
              videos: [
                {
                  id: "4",
                  title: "Introduction to UI Patterns",
                  moduleId: "3",
                  duration: "24:10",
                  views: 70,
                  completions: 60,
                },
              ],
            },
          ],
          completion: "95/140",
          views: 278,
        },
      ])
      setIsLoading(false)
    }

    fetchCourses()
  }, [])

  const addCourse = (course: Omit<Course, "id" | "modules" | "completion" | "views">) => {
    const newCourse: Course = {
      ...course,
      id: Math.random().toString(36).substring(2, 9),
      modules: [],
      completion: "0/0",
      views: 0,
    }
    setCourses([...courses, newCourse])
  }

  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course)))

    // Update selected course if it's the one being updated
    if (selectedCourse && selectedCourse.id === id) {
      setSelectedCourse({ ...selectedCourse, ...updatedCourse })
    }
  }

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))

    // Clear selected course if it's the one being deleted
    if (selectedCourse && selectedCourse.id === id) {
      setSelectedCourse(null)
      setSelectedTab("all")
    }
  }

  const selectCourse = async (id: string | null) => {
    if (!id) {
      setSelectedCourse(null)
      return
    }

    setIsLoadingCourse(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const course = courses.find((c) => c.id === id) || null
    setSelectedCourse(course)
    setIsLoadingCourse(false)
  }

  const searchCourses = (query: string) => {
    if (!query) return courses
    const lowercaseQuery = query.toLowerCase()
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.program.toLowerCase().includes(lowercaseQuery) ||
        course.branch.toLowerCase().includes(lowercaseQuery),
    )
  }

  const addModule = (courseId: string, module: Omit<Module, "id" | "videos">) => {
    const newModule: Module = {
      ...module,
      id: Math.random().toString(36).substring(2, 9),
      videos: [],
    }

    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: [...course.modules, newModule],
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: [...selectedCourse.modules, newModule],
      })
    }
  }

  const updateModule = (courseId: string, moduleId: string, updatedModule: Partial<Module>) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) =>
              module.id === moduleId ? { ...module, ...updatedModule } : module,
            ),
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) =>
          module.id === moduleId ? { ...module, ...updatedModule } : module,
        ),
      })
    }
  }

  const deleteModule = (courseId: string, moduleId: string) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.filter((module) => module.id !== moduleId),
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: selectedCourse.modules.filter((module) => module.id !== moduleId),
      })
    }
  }

  const addVideo = (courseId: string, moduleId: string, video: Omit<Video, "id" | "moduleId">) => {
    const newVideo: Video = {
      ...video,
      id: Math.random().toString(36).substring(2, 9),
      moduleId,
    }

    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) => {
              if (module.id === moduleId) {
                return {
                  ...module,
                  videos: [...module.videos, newVideo],
                }
              }
              return module
            }),
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) => {
          if (module.id === moduleId) {
            return {
              ...module,
              videos: [...module.videos, newVideo],
            }
          }
          return module
        }),
      })
    }
  }

  const updateVideo = (courseId: string, videoId: string, updatedVideo: Partial<Video>) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) => {
              return {
                ...module,
                videos: module.videos.map((video) => (video.id === videoId ? { ...video, ...updatedVideo } : video)),
              }
            }),
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) => {
          return {
            ...module,
            videos: module.videos.map((video) => (video.id === videoId ? { ...video, ...updatedVideo } : video)),
          }
        }),
      })
    }
  }

  const deleteVideo = (courseId: string, videoId: string) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) => {
              return {
                ...module,
                videos: module.videos.filter((video) => video.id !== videoId),
              }
            }),
          }
        }
        return course
      }),
    )

    // Update selected course if it's the one being modified
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) => {
          return {
            ...module,
            videos: module.videos.filter((video) => video.id !== videoId),
          }
        }),
      })
    }
  }

  // Update analytics loading state when filter changes
  useEffect(() => {
    if (selectedTab === "analytics") {
      setIsLoadingAnalytics(true)
      const timer = setTimeout(() => {
        setIsLoadingAnalytics(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [analyticsFilter, selectedTab])

  return (
    <CourseContext.Provider
      value={{
        courses,
        selectedCourse,
        selectedTab,
        analyticsFilter,
        isLoading,
        isLoadingCourse,
        isLoadingAnalytics,
        addCourse,
        updateCourse,
        deleteCourse,
        selectCourse,
        setSelectedTab,
        setAnalyticsFilter,
        searchCourses,
        addModule,
        updateModule,
        deleteModule,
        addVideo,
        updateVideo,
        deleteVideo,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider")
  }
  return context
}
