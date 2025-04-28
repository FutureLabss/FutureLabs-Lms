"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useClassrooms, type Module } from "./classroom-provider"

interface AddAssignmentDialogProps {
  classroomId: string
  modules: Module[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssignmentDialog({ classroomId, modules, open, onOpenChange }: AddAssignmentDialogProps) {
  const { addAssignment } = useClassrooms()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    moduleId: "",
    dueDate: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      newErrors.title = "Assignment title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.moduleId) {
      newErrors.moduleId = "Module is required"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    } else {
      const dueDate = new Date(formData.dueDate)
      const today = new Date()
      if (dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addAssignment(classroomId, {
      title: formData.title,
      description: formData.description,
      moduleId: formData.moduleId,
      dueDate: formData.dueDate,
      totalSubmissions: 0,
      gradedSubmissions: 0,
    })

    setIsSubmitting(false)
    setFormData({
      title: "",
      description: "",
      moduleId: "",
      dueDate: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Assignment Title</Label>
            <Input
              id="title"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter assignment description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              rows={3}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="module">Module</Label>
            <Select value={formData.moduleId} onValueChange={(value) => handleChange("moduleId", value)}>
              <SelectTrigger id="module" className={errors.moduleId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.moduleId && <p className="text-xs text-red-500">{errors.moduleId}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className={errors.dueDate ? "border-red-500" : ""}
            />
            {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
