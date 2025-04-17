"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useClassrooms, type Module } from "./classroom-provider"

interface AddMaterialDialogProps {
  classroomId: string
  modules: Module[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMaterialDialog({ classroomId, modules, open, onOpenChange }: AddMaterialDialogProps) {
  const { addMaterial } = useClassrooms()
  const [formData, setFormData] = useState({
    title: "",
    type: "pdf",
    moduleId: "",
    url: "",
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
      newErrors.title = "Material title is required"
    }

    if (!formData.moduleId) {
      newErrors.moduleId = "Module is required"
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required"
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addMaterial(classroomId, {
      title: formData.title,
      type: formData.type as "pdf" | "video" | "link" | "document",
      moduleId: formData.moduleId,
      url: formData.url,
    })

    setIsSubmitting(false)
    setFormData({
      title: "",
      type: "pdf",
      moduleId: "",
      url: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Material Title</Label>
            <Input
              id="title"
              placeholder="Enter material title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Material Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="Enter material URL"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && <p className="text-xs text-red-500">{errors.url}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Material"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
