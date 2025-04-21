"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useClassrooms } from "./classroom-provider"

interface EditModuleDialogProps {
  classroomId: string
  moduleId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditModuleDialog({ classroomId, moduleId, open, onOpenChange }: EditModuleDialogProps) {
  const { classrooms, updateModule } = useClassrooms()
  const classroom = classrooms.find((c) => c.id === classroomId)
  const module = classroom?.modules.find((m) => m.id === moduleId)

  const [formData, setFormData] = useState({
    title: module?.title || "",
    description: module?.description || "",
    duration: module?.duration || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when module changes
  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
        duration: module.duration,
      })
    }
  }, [module])

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
      newErrors.title = "Module title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !module) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateModule(classroomId, moduleId, {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
    })

    setIsSubmitting(false)
    onOpenChange(false)
  }

  if (!module) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Module Title</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              rows={3}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-duration">Duration</Label>
            <Input
              id="edit-duration"
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
