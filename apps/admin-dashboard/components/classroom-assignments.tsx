"use client"

import { useState } from "react"
import { Calendar, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import { AddAssignmentDialog } from "./add-assignment-dialog"

interface ClassroomAssignmentsProps {
  classroom: Classroom
}

export function ClassroomAssignments({ classroom }: ClassroomAssignmentsProps) {
  const { removeAssignment } = useClassrooms()
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null)

  const handleDeleteAssignment = () => {
    if (assignmentToDelete) {
      removeAssignment(classroom.id, assignmentToDelete)
      setAssignmentToDelete(null)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Assignments ({classroom.assignments.length})</h2>
        <Button onClick={() => setIsAddAssignmentOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </div>

      {classroom.assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No assignments found</h3>
            <p className="text-muted-foreground mt-1">Create assignments for your students</p>
            <Button className="mt-4" onClick={() => setIsAddAssignmentOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Assignment
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Assignment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Module</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Due Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Submissions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classroom.assignments.map((assignment) => {
                  const module = classroom.modules.find((m) => m.id === assignment.moduleId)
                  const submissionRate =
                    assignment.totalSubmissions > 0
                      ? Math.round((assignment.gradedSubmissions / assignment.totalSubmissions) * 100)
                      : 0

                  return (
                    <tr key={assignment.id} className="border-b">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{assignment.description}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{module?.title || "Unknown"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(assignment.dueDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              Graded: {assignment.gradedSubmissions}/{assignment.totalSubmissions}
                            </span>
                            <span>{submissionRate}%</span>
                          </div>
                          <Progress value={submissionRate} className="h-2" />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Assignment</DropdownMenuItem>
                            <DropdownMenuItem>View Submissions</DropdownMenuItem>
                            <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => setAssignmentToDelete(assignment.id)}
                            >
                              Delete Assignment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddAssignmentDialog
        classroomId={classroom.id}
        modules={classroom.modules}
        open={isAddAssignmentOpen}
        onOpenChange={setIsAddAssignmentOpen}
      />

      <AlertDialog open={!!assignmentToDelete} onOpenChange={(open) => !open && setAssignmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this assignment? This action cannot be undone and will remove all
              associated submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAssignment} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}
