"use client"

import { useState } from "react"
import { Plus, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useClassrooms, type Classroom } from "./classroom-provider"

interface ClassroomTutorsProps {
  classroom: Classroom
}

export function ClassroomTutors({ classroom }: ClassroomTutorsProps) {
  const { removeTutor } = useClassrooms()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddTutorOpen, setIsAddTutorOpen] = useState(false)
  const [tutorToRemove, setTutorToRemove] = useState<string | null>(null)

  const filteredTutors = classroom.tutors.filter((tutor) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return tutor.name.toLowerCase().includes(query) || tutor.role.toLowerCase().includes(query)
  })

  const handleRemoveTutor = () => {
    if (tutorToRemove) {
      removeTutor(classroom.id, tutorToRemove)
      setTutorToRemove(null)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Tutors ({classroom.tutors.length})</h2>
          <p className="text-muted-foreground">Manage tutors for this classroom</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tutors..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddTutorOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Tutor
          </Button>
        </div>
      </div>

      {filteredTutors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No tutors found</h3>
            <p className="text-muted-foreground mt-1">
              {classroom.tutors.length === 0
                ? "Add tutors to this classroom to get started"
                : "Try adjusting your search"}
            </p>
            {classroom.tutors.length === 0 && (
              <Button className="mt-4" onClick={() => setIsAddTutorOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tutor
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
                  <th className="px-4 py-3 text-left text-sm font-medium">Tutor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutors.map((tutor) => (
                  <tr key={tutor.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <img
                            src={tutor.avatar || "/placeholder.svg?height=32&width=32"}
                            alt={tutor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="font-medium">{tutor.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{tutor.role}</td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setTutorToRemove(tutor.id)}
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

      {/* Add Tutor Dialog would go here */}
      {isAddTutorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">Add Tutor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This is a placeholder. In a real application, you would implement a form to add tutors.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddTutorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddTutorOpen(false)}>Add Tutor</Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Tutor Confirmation */}
      {tutorToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">Remove Tutor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to remove this tutor from the classroom? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setTutorToRemove(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRemoveTutor}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
