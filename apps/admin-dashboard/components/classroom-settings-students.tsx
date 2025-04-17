"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useClassrooms, type Classroom } from "./classroom-provider"

interface ClassroomSettingsStudentsProps {
  classroom: Classroom
}

export function ClassroomSettingsStudents({ classroom }: ClassroomSettingsStudentsProps) {
  const { removeStudent } = useClassrooms()
  const [searchQuery, setSearchQuery] = useState("")
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
        <div>
          <h2 className="text-lg font-semibold">Students ({classroom.students.length})</h2>
          <p className="text-muted-foreground">Manage students for this classroom</p>
        </div>
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
      </div>

      {filteredStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No students found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Progress</th>
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
                        <div className="font-medium">{student.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{student.email}</td>
                    <td className="px-4 py-3">
                      <Badge className={student.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {student.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${
                              student.progress < 30
                                ? "bg-red-500"
                                : student.progress < 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setStudentToRemove(student.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Remove Student Confirmation */}
      {studentToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">Remove Student</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to remove this student from the classroom? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStudentToRemove(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRemoveStudent}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
