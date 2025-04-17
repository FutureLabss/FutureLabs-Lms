"use client"

import { useState } from "react"
import { Calendar, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AddAnnouncementDialog } from "./add-announcement-dialog"

interface ClassroomAnnouncementsProps {
  classroom: Classroom
}

export function ClassroomAnnouncements({ classroom }: ClassroomAnnouncementsProps) {
  const { removeAnnouncement } = useClassrooms()
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null)

  const handleDeleteAnnouncement = () => {
    if (announcementToDelete) {
      removeAnnouncement(classroom.id, announcementToDelete)
      setAnnouncementToDelete(null)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Announcements ({classroom.announcements.length})</h2>
        <Button onClick={() => setIsAddAnnouncementOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Announcement
        </Button>
      </div>

      {classroom.announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <div className="text-center">
            <h3 className="text-lg font-medium">No announcements found</h3>
            <p className="text-muted-foreground mt-1">Create announcements to communicate with your students</p>
            <Button className="mt-4" onClick={() => setIsAddAnnouncementOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Announcement
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {classroom.announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">{announcement.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(announcement.createdAt)}</span>
                    <span>•</span>
                    <span>{announcement.author}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Announcement</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={() => setAnnouncementToDelete(announcement.id)}>
                      Delete Announcement
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddAnnouncementDialog
        classroomId={classroom.id}
        open={isAddAnnouncementOpen}
        onOpenChange={setIsAddAnnouncementOpen}
      />

      <AlertDialog open={!!announcementToDelete} onOpenChange={(open) => !open && setAnnouncementToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAnnouncement} className="bg-red-500 hover:bg-red-600">
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
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
