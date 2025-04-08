"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const materialFormSchema = z.object({
  title: z.string().min(2, {
    message: "Material title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  type: z.enum(["pdf", "document", "presentation", "link", "other"], {
    required_error: "Please select a material type.",
  }),
  url: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .or(z.string().length(0)),
  file: z.any().optional(),
})

type AddMaterialModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMaterialAdded: (material: any) => void
  classId: string | number
}

export function AddMaterialModal({ open, onOpenChange, onMaterialAdded, classId }: AddMaterialModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploadMode, setIsUploadMode] = useState(true)

  const form = useForm<z.infer<typeof materialFormSchema>>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
      url: "",
      file: undefined,
    },
  })

  const watchType = form.watch("type")

  function onSubmit(values: z.infer<typeof materialFormSchema>) {
    setIsSubmitting(true)

    // Simulate file upload if a file is selected
    if (selectedFile && isUploadMode) {
      // In a real application, you would upload the file to a storage service
      // and get back a URL to store in the database
      setTimeout(() => {
        const fileUrl = URL.createObjectURL(selectedFile) // This is just for demo purposes

        const newMaterial = {
          id: Math.floor(Math.random() * 1000), // Generate a random ID for demo purposes
          title: values.title,
          description: values.description || "",
          type: values.type,
          url: fileUrl,
          createdAt: new Date().toISOString(),
        }

        // Call the callback with the new material
        onMaterialAdded(newMaterial)

        // Reset form and state
        form.reset()
        setSelectedFile(null)
        setIsSubmitting(false)

        // Close the modal
        onOpenChange(false)

        toast({
          title: "Material added",
          description: `${values.title} has been added to the class.`,
        })
      }, 1500)
    } else if (!isUploadMode && values.url) {
      // Handle link-based material
      setTimeout(() => {
        const newMaterial = {
          id: Math.floor(Math.random() * 1000), // Generate a random ID for demo purposes
          title: values.title,
          description: values.description || "",
          type: values.type,
          url: values.url,
          createdAt: new Date().toISOString(),
        }

        // Call the callback with the new material
        onMaterialAdded(newMaterial)

        // Reset form and state
        form.reset()
        setIsSubmitting(false)

        // Close the modal
        onOpenChange(false)

        toast({
          title: "Material added",
          description: `${values.title} has been added to the class.`,
        })
      }, 500)
    } else {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Please provide either a file or a URL for the material.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])

      // Auto-fill the title with the file name if it's empty
      if (!form.getValues("title")) {
        const fileName = e.target.files[0].name.split(".").slice(0, -1).join(".")
        form.setValue("title", fileName)
      }

      // Set the type based on file extension
      const fileExtension = e.target.files[0].name.split(".").pop()?.toLowerCase()
      if (fileExtension) {
        if (fileExtension === "pdf") {
          form.setValue("type", "pdf")
        } else if (["doc", "docx"].includes(fileExtension)) {
          form.setValue("type", "document")
        } else if (["ppt", "pptx"].includes(fileExtension)) {
          form.setValue("type", "presentation")
        } else {
          form.setValue("type", "other")
        }
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
          <DialogDescription>Upload a file or provide a link to add a new material to this class.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center space-x-4 py-4">
          <Button
            variant={isUploadMode ? "default" : "outline"}
            onClick={() => setIsUploadMode(true)}
            className="w-full"
          >
            Upload File
          </Button>
          <Button
            variant={!isUploadMode ? "default" : "outline"}
            onClick={() => setIsUploadMode(false)}
            className="w-full"
          >
            Add Link
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Calculus Fundamentals" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive name for this material.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of this material"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isUploadMode ? (
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {selectedFile ? selectedFile.name : "Drag and drop your file here or click to browse"}
                        </p>
                        <Input
                          type="file"
                          id="material-file"
                          className="hidden"
                          accept={
                            watchType === "pdf"
                              ? ".pdf"
                              : watchType === "document"
                                ? ".doc,.docx"
                                : watchType === "presentation"
                                  ? ".ppt,.pptx"
                                  : undefined
                          }
                          onChange={(e) => {
                            handleFileChange(e)
                            onChange(e.target.files)
                          }}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            document.getElementById("material-file")?.click()
                          }}
                        >
                          Choose File
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/material" {...field} />
                    </FormControl>
                    <FormDescription>The URL where this material can be accessed.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Material
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
