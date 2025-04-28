"use client"

import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useClassrooms } from "./classroom-provider"
import { ClassroomListSkeleton } from "./classroom-list-skeleton"

export function ClassroomList() {
  const { filteredClassrooms, isLoading } = useClassrooms()
  const router = useRouter()

  const handleManage = (id: string) => {
    // Simply navigate to the classroom detail page
    router.push(`/classrooms/${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-500">Completed</Badge>
      default:
        return null
    }
  }

  if (isLoading) {
    return <ClassroomListSkeleton />
  }

  if (filteredClassrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium">No classrooms found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Classroom</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Program</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Students</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Start Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">End Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClassrooms.map((classroom) => (
              <tr key={classroom.id} className="border-b">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{classroom.title}</div>
                    <div className="text-sm text-muted-foreground">{classroom.course}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{classroom.program}</td>
                <td className="px-4 py-3 text-sm">{classroom.students.length}</td>
                <td className="px-4 py-3 text-sm">{formatDate(classroom.startDate)}</td>
                <td className="px-4 py-3 text-sm">{formatDate(classroom.endDate)}</td>
                <td className="px-4 py-3 text-sm">{getStatusBadge(classroom.status)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleManage(classroom.id)}>
                      Manage
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleManage(classroom.id)}>Manage Classroom</DropdownMenuItem>
                        <DropdownMenuItem>View Class Feed</DropdownMenuItem>
                        <DropdownMenuItem>Edit Classroom</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete Classroom</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
}
