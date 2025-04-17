"use client"

import { useState } from "react"
import { Edit, Trash2, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCourses } from "./course-provider"
import { AddModuleDialog } from "./add-module-dialog"
import { EditModuleDialog } from "./edit-module-dialog"
import { AddVideoDialog } from "./add-video-dialog"
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
import { EditCourseDialog } from "./edit-course-dialog"
import { CourseDetailsSkeleton } from "./course-details-skeleton"

export function CourseDetails() {
  const { selectedCourse, setSelectedTab, deleteModule, isLoadingCourse } = useCourses()
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [moduleToEdit, setModuleToEdit] = useState<string | null>(null)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)
  const [moduleForVideo, setModuleForVideo] = useState<string | null>(null)

  if (isLoadingCourse || !selectedCourse) {
    return <CourseDetailsSkeleton />
  }

  const handleDeleteModule = () => {
    if (moduleToDelete && selectedCourse) {
      deleteModule(selectedCourse.id, moduleToDelete)
      setModuleToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
          <p className="text-sm text-muted-foreground">
            Program: {selectedCourse.program} · Branch: {selectedCourse.branch} · Students: {selectedCourse.students} ·
            Total Views · Branch: {selectedCourse.branch} · Students: {selectedCourse.students} · Total Views:{" "}
            {selectedCourse.views}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedTab("all")}>
            Back to Courses
          </Button>
          <Button onClick={() => setIsEditCourseOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{selectedCourse.description}</p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Course Modules</h3>
        <Button onClick={() => setIsAddModuleOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {selectedCourse.modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{module.title}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setModuleToEdit(module.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Module</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setModuleToDelete(module.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Delete Module</span>
                  </Button>
                </div>
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Videos ({module.videos.length})</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setModuleForVideo(module.id)}>
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add Video
                  </Button>
                </div>
                {module.videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{video.title}</span>
                      <span className="text-xs text-muted-foreground">({video.duration})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <span>·</span>
                      <span>{video.completions} completions</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-sm font-medium">Video Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Module</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Duration</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Views</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Completions</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.modules.flatMap((module) =>
                  module.videos.map((video) => (
                    <tr key={video.id} className="border-b">
                      <td className="px-4 py-2 text-sm">{video.title}</td>
                      <td className="px-4 py-2 text-sm">{module.title}</td>
                      <td className="px-4 py-2 text-sm">{video.duration}</td>
                      <td className="px-4 py-2 text-sm">{video.views}</td>
                      <td className="px-4 py-2 text-sm">{video.completions}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddModuleDialog courseId={selectedCourse.id} open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen} />

      {moduleToEdit && (
        <EditModuleDialog
          courseId={selectedCourse.id}
          moduleId={moduleToEdit}
          open={!!moduleToEdit}
          onOpenChange={(open) => !open && setModuleToEdit(null)}
        />
      )}

      {moduleForVideo && (
        <AddVideoDialog
          courseId={selectedCourse.id}
          moduleId={moduleForVideo}
          open={!!moduleForVideo}
          onOpenChange={(open) => !open && setModuleForVideo(null)}
        />
      )}

      <AlertDialog open={!!moduleToDelete} onOpenChange={(open) => !open && setModuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the module and all its videos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteModule} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditCourseDialog courseId={selectedCourse.id} open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen} />
    </div>
  )
}
