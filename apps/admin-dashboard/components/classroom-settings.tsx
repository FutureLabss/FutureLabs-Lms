"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useClassrooms, type Classroom, type ClassroomStatus } from "./classroom-provider"
import { ClassroomTutors } from "./classroom-tutors"
import { ClassroomSettingsStudents } from "./classroom-settings-students"

interface ClassroomSettingsProps {
  classroom: Classroom
}

export function ClassroomSettings({ classroom }: ClassroomSettingsProps) {
  const { settingsTab, setSettingsTab, updateClassroomSettings } = useClassrooms()
  const [formData, setFormData] = useState({
    title: classroom.title,
    program: classroom.program,
    course: classroom.course,
    description: classroom.description,
    status: classroom.status,
    startDate: classroom.startDate,
    endDate: classroom.endDate,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsSaved(false)

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
      newErrors.title = "Classroom name is required"
    }

    if (!formData.program.trim()) {
      newErrors.program = "Program is required"
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required"
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateClassroomSettings(classroom.id, {
      title: formData.title,
      program: formData.program,
      course: formData.course,
      description: formData.description,
      status: formData.status as ClassroomStatus,
      startDate: formData.startDate,
      endDate: formData.endDate,
    })

    setIsSubmitting(false)
    setIsSaved(true)

    // Reset saved status after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  return (
    <div className="mt-6">
      <Tabs value={settingsTab} onValueChange={(value) => setSettingsTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="tutors">Tutors</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <div className="space-y-6 py-4">
            <div>
              <h2 className="text-lg font-semibold">Classroom Settings</h2>
              <p className="text-muted-foreground">
                Manage your classroom settings including name, description, and enrollment options.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Classroom Name</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    value={formData.program}
                    onChange={(e) => handleChange("program", e.target.value)}
                    className={errors.program ? "border-red-500" : ""}
                  />
                  {errors.program && <p className="text-xs text-red-500">{errors.program}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => handleChange("course", e.target.value)}
                    className={errors.course ? "border-red-500" : ""}
                  />
                  {errors.course && <p className="text-xs text-red-500">{errors.course}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                  {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className={errors.endDate ? "border-red-500" : ""}
                  />
                  {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={isSaved ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {isSubmitting ? "Saving..." : isSaved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tutors">
          <ClassroomTutors classroom={classroom} />
        </TabsContent>
        <TabsContent value="students">
          <ClassroomSettingsStudents classroom={classroom} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
