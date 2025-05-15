"use client"

import { useState, useEffect } from "react"
import { studentService } from "@/services/student-service"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  enrollmentDate: string
  classes: string[]
  level: string
  status: string
  lastActive: string
  progress: number
}

interface StudentFilters {
  search?: string
  level?: string
  status?: string
}

export function useStudents(initialFilters?: StudentFilters) {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [filters, setFilters] = useState<StudentFilters>(initialFilters || {})

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await studentService.getStudents(filters)
        setStudents(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [filters])

  const updateFilters = (newFilters: StudentFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return {
    students,
    isLoading,
    error,
    filters,
    updateFilters,
  }
}
