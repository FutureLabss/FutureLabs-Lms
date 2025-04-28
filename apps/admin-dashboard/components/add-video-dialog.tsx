"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCourses } from "./course-provider"

interface AddVideoDialogProps {
  courseId: string
  moduleId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddVideoDialog({ courseId, moduleId, open, onOpenChange }: AddVideoDialogProps) {
  const { addVideo } = useCourses()
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      newErrors.title = "Video title is required"
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required"
    } else if (!/^\d+:\d+$/.test(formData.duration)) {
      newErrors.duration = "Duration must be in format MM:SS"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    addVideo(courseId, moduleId, {
      title: formData.title,
      duration: formData.duration,
      views: 0,
      completions: 0,
    })

    // Reset form and close dialog
    setFormData({
      title: "",
      duration: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="video-title">Video Title</Label>
            <Input
              id="video-title"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="video-duration">Duration (MM:SS)</Label>
            <Input
              id="video-duration"
              placeholder="e.g. 12:30"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className={errors.duration ? "border-red-500" : ""}
            />
            {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Video</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
