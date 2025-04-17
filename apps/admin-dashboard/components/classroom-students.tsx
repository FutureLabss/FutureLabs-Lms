"use client"

import { useState } from "react"
import { MoreVertical, Plus, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { useClassrooms, type Classroom } from "./classroom-provider"
import { AddStudentDialog } from "./add-student-dialog"

interface ClassroomStudentsProps {
  classroom: Classroom
}

export function ClassroomStudents({ classroom }: ClassroomStudentsProps) {
  const { removeStudent } = useClassrooms()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState<string | null>(null)

  const filteredStudents = classroom.students.filter((student) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
  })

  const handleRemoveStudent = () => {
    if (studentToRemove) {
      removeStudent(classroom.id, studentToRemove)
      setStudentToRemove(null)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-lg font-semibold">Students ({classroom.students.length})</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddStudentOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No students found</h3>
            <p className="text-muted-foreground mt-1">
              {classroom.students.length === 0
                ? "Add students to this classroom to get started"
                : "Try adjusting your search"}
            </p>
            {classroom.students.length === 0 && (
              <Button className="mt-4" onClick={() => setIsAddStudentOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Last Active</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <span className="text-sm font-medium">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${getProgressColorClass(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={student.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {student.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{student.lastActive}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>View Progress</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => setStudentToRemove(student.id)}>
                            Remove from Classroom
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddStudentDialog classroomId={classroom.id} open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen} />

      <AlertDialog open={!!studentToRemove} onOpenChange={(open) => !open && setStudentToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this student from the classroom? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveStudent} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function getProgressColorClass(progress: number) {
  if (progress < 30) return "bg-red-500"
  if (progress < 70) return "bg-yellow-500"
  return "bg-green-500"
}
