// Mock data service for the application
// In a real application, this would be replaced with API calls

import type { Class, Course, User } from "./types"

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "tutor",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "student",
    avatar: "/placeholder.svg",
  },
]

// Mock Classes
export const classes: Class[] = [
  {
    id: "1",
    name: "Advanced Mathematics",
    description: "A comprehensive course covering advanced mathematical concepts",
    program: "High School",
    maxStudents: 20,
    currentStudents: 15,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    schedule: {
      daysOfWeek: ["Monday", "Wednesday", "Friday"],
      startTime: "14:00",
      endTime: "15:30",
    },
    status: "active",
    tutorId: "1",
    students: ["2"],
    materials: [],
    assignments: [],
  },
  {
    id: "2",
    name: "Introduction to Physics",
    description: "Basic principles of physics for beginners",
    program: "Middle School",
    maxStudents: 15,
    currentStudents: 12,
    startDate: "2023-09-05",
    endDate: "2023-12-10",
    schedule: {
      daysOfWeek: ["Tuesday", "Thursday"],
      startTime: "13:00",
      endTime: "14:30",
    },
    status: "active",
    tutorId: "1",
    students: ["2"],
    materials: [],
    assignments: [],
  },
]

// Mock Courses
export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description: "Learn the fundamentals of algebra",
    category: "mathematics",
    thumbnail: "/placeholder.svg",
    status: "published",
    tutorId: "1",
    students: ["2"],
    modules: [
      {
        id: "1",
        title: "Basic Concepts",
        videos: [
          {
            id: "1",
            title: "Introduction to Variables",
            description: "Understanding variables in algebra",
            url: "#",
            duration: 600,
            thumbnail: "/placeholder.svg",
          },
        ],
        materials: [
          {
            id: "1",
            title: "Algebra Basics PDF",
            description: "A comprehensive guide to algebra basics",
            type: "pdf",
            url: "#",
            createdAt: "2023-08-15",
          },
        ],
      },
    ],
    createdAt: "2023-08-01",
    updatedAt: "2023-08-15",
  },
  {
    id: "2",
    title: "Chemistry Basics",
    description: "Understanding chemical reactions and elements",
    category: "science",
    thumbnail: "/placeholder.svg",
    status: "published",
    tutorId: "1",
    students: ["2"],
    modules: [
      {
        id: "1",
        title: "Introduction to Elements",
        videos: [
          {
            id: "1",
            title: "The Periodic Table",
            description: "Understanding the periodic table of elements",
            url: "#",
            duration: 720,
            thumbnail: "/placeholder.svg",
          },
        ],
        materials: [],
      },
    ],
    createdAt: "2023-07-20",
    updatedAt: "2023-08-10",
  },
]

// Data access functions
export async function getClasses() {
  return classes
}

export async function getClassById(id: string) {
  return classes.find((cls) => cls.id === id)
}

export async function getCourses() {
  return courses
}

export async function getCourseById(id: string) {
  return courses.find((course) => course.id === id)
}

export async function getUsers() {
  return users
}

export async function getUserById(id: string) {
  return users.find((user) => user.id === id)
}
