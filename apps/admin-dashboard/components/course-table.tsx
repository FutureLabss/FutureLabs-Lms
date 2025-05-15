"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useCourses } from "./course-provider"
import { EditCourseDialog } from "./edit-course-dialog"
import { CourseTableSkeleton } from "./course-table-skeleton"

interface CourseTableProps {
  searchQuery: string
}

export function CourseTable({ searchQuery }: CourseTableProps) {
  const { courses, searchCourses, deleteCourse, selectCourse, setSelectedTab, isLoading } = useCourses()
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null)
  const [courseToEdit, setCourseToEdit] = useState<string | null>(null)

  const filteredCourses = searchQuery ? searchCourses(searchQuery) : courses

  const handleDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete)
      setCourseToDelete(null)
    }
  }

  const handleManage = (courseId: string) => {
    selectCourse(courseId)
    setSelectedTab("details")
  }

  if (isLoading) {
    return <CourseTableSkeleton />
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Course Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Program</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Branch</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Students</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Modules</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Completion</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Views</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No courses found. Try a different search or add a new course.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{course.title}</td>
                    <td className="px-4 py-3 text-sm">{course.program}</td>
                    <td className="px-4 py-3 text-sm">{course.branch}</td>
                    <td className="px-4 py-3 text-sm">{course.students}</td>
                    <td className="px-4 py-3 text-sm">{course.modules.length}</td>
                    <td className="px-4 py-3 text-sm">{course.completion}</td>
                    <td className="px-4 py-3 text-sm">{course.views}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleManage(course.id)}>
                          Manage
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setCourseToEdit(course.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setCourseToDelete(course.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course and all its modules and videos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {courseToEdit && (
        <EditCourseDialog
          courseId={courseToEdit}
          open={!!courseToEdit}
          onOpenChange={(open) => !open && setCourseToEdit(null)}
        />
      )}
    </>
  )
}
