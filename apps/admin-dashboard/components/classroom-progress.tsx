"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Classroom } from "./classroom-provider"

interface ClassroomProgressProps {
  classroom: Classroom
}

export function ClassroomProgress({ classroom }: ClassroomProgressProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = classroom.students.filter((student) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
  })

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Student Progress</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 w-[250px]"
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
        <div className="space-y-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={student.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                    {student.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <div className="text-right">
                    <div className="font-medium">{student.progress}%</div>
                    <p className="text-xs text-muted-foreground">Overall Progress</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium">Overall Progress</h4>
                    <span className="text-sm">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                {classroom.modules.map((module) => {
                  // Generate random progress for each module (in a real app, this would come from the API)
                  const moduleProgress = Math.floor(Math.random() * 101)

                  return (
                    <div key={module.id}>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium">{module.title}</h4>
                        <span className="text-sm">{moduleProgress}%</span>
                      </div>
                      <Progress value={moduleProgress} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
