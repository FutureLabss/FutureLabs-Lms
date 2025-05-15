"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCourses } from "./course-provider"

interface EditCourseDialogProps {
  courseId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCourseDialog({ courseId, open, onOpenChange }: EditCourseDialogProps) {
  const { courses, updateCourse } = useCourses()
  const course = courses.find((c) => c.id === courseId)

  const [formData, setFormData] = useState({
    title: course?.title || "",
    program: course?.program || "",
    branch: course?.branch || "",
    description: course?.description || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when course changes
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        program: course.program,
        branch: course.branch,
        description: course.description,
      })
    }
  }, [course])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Course title is required"
    }

    if (!formData.program.trim()) {
      newErrors.program = "Program is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm() || !course) return

    updateCourse(courseId, {
      title: formData.title,
      program: formData.program,
      branch: formData.branch || "N/A",
      description: formData.description,
    })

    onOpenChange(false)
  }

  if (!course) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Course Title</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-program">Program</Label>
              <Input
                id="edit-program"
                value={formData.program}
                onChange={(e) => handleChange("program", e.target.value)}
                className={errors.program ? "border-red-500" : ""}
              />
              {errors.program && <p className="text-xs text-red-500">{errors.program}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-branch">Branch (Optional)</Label>
              <Input
                id="edit-branch"
                value={formData.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              rows={4}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
