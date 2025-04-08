"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, File, Plus, Upload, X } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Course title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  thumbnail: z.string().optional(),
})

export default function NewCoursePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [modules, setModules] = useState([{ id: 1, title: "", videos: [], materials: [] }])
  const [dragOver, setDragOver] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      thumbnail: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, modules)
    // Here you would typically save the course data to your backend
    router.push("/courses")
  }

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        title: "",
        videos: [],
        materials: [],
      },
    ])
  }

  const removeModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id))
  }

  const updateModuleTitle = (id: number, title: string) => {
    setModules(modules.map((module) => (module.id === id ? { ...module, title } : module)))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent, moduleId: number, type: "videos" | "materials") => {
    e.preventDefault()
    setDragOver(false)

    // In a real implementation, you would handle file uploads here
    // For this example, we'll just simulate adding a file
    const fileName = e.dataTransfer.files[0]?.name || "Untitled File"

    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              [type]: [
                ...module[type],
                {
                  id: Date.now(),
                  name: fileName,
                  url: "#",
                },
              ],
            }
          : module,
      ),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Fill in the details to create a new pre-recorded course</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Introduction to Algebra" {...field} />
                        </FormControl>
                        <FormDescription>The title of your course as it will appear to students.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief description of the course"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>A short description of what students will learn.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="language">Language Arts</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The category this course belongs to.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                          <div
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 ${
                              dragOver ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => {
                              e.preventDefault()
                              setDragOver(false)
                              // In a real implementation, you would handle file uploads here
                              field.onChange(e.dataTransfer.files[0]?.name || "")
                            }}
                          >
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Drag and drop your thumbnail image here or click to browse
                            </p>
                            <Input
                              type="file"
                              className="hidden"
                              id="thumbnail-upload"
                              onChange={(e) => {
                                // In a real implementation, you would handle file uploads here
                                field.onChange(e.target.files?.[0]?.name || "")
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                document.getElementById("thumbnail-upload")?.click()
                              }}
                            >
                              Choose File
                            </Button>
                            {field.value && <div className="mt-2 text-sm">Selected: {field.value}</div>}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a thumbnail image for your course. Recommended size: 1280x720px.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <Card key={module.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Input
                              placeholder={`Module ${index + 1} Title`}
                              value={module.title}
                              onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                              className="border-0 p-0 text-lg font-semibold focus-visible:ring-0"
                            />
                            {modules.length > 1 && (
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(module.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Videos</h4>
                            <div
                              className={`border-2 border-dashed rounded-lg p-4 ${
                                dragOver ? "border-primary bg-primary/5" : "border-border"
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, module.id, "videos")}
                            >
                              {module.videos.length > 0 ? (
                                <div className="space-y-2">
                                  {module.videos.map((video) => (
                                    <div
                                      key={video.id}
                                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                                    >
                                      <div className="flex items-center gap-2">
                                        <File className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{video.name}</span>
                                      </div>
                                      <Button variant="ghost" size="icon">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-4 gap-2">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Drag and drop video files here or click to browse
                                  </p>
                                  <Button type="button" variant="outline" size="sm">
                                    Upload Video
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Materials</h4>
                            <div
                              className={`border-2 border-dashed rounded-lg p-4 ${
                                dragOver ? "border-primary bg-primary/5" : "border-border"
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, module.id, "materials")}
                            >
                              {module.materials.length > 0 ? (
                                <div className="space-y-2">
                                  {module.materials.map((material) => (
                                    <div
                                      key={material.id}
                                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                                    >
                                      <div className="flex items-center gap-2">
                                        <File className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{material.name}</span>
                                      </div>
                                      <Button variant="ghost" size="icon">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-4 gap-2">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Drag and drop PDF/PPT files here or click to browse
                                  </p>
                                  <Button type="button" variant="outline" size="sm">
                                    Upload Material
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button type="button" variant="outline" className="w-full" onClick={addModule}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Course Visibility</h3>
                        <p className="text-sm text-muted-foreground">Control whether students can see this course</p>
                      </div>
                      <Select defaultValue="draft">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => router.push("/courses")}>
                    Cancel
                  </Button>
                  {activeTab !== "details" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (activeTab === "content") setActiveTab("details")
                        if (activeTab === "settings") setActiveTab("content")
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeTab !== "settings" ? (
                    <Button
                      type="button"
                      onClick={() => {
                        if (activeTab === "details") setActiveTab("content")
                        if (activeTab === "content") setActiveTab("settings")
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">Create Course</Button>
                  )}
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
