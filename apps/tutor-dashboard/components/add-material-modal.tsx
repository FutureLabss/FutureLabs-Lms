"use client"

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
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCreateClassroomMaterial } from "@/hooks/mutate/classroom"

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
  classId: string
  topicId: string
}

export function AddMaterialModal({ open, onOpenChange, onMaterialAdded, classId, topicId }: AddMaterialModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploadMode, setIsUploadMode] = useState(true)
  const { mutate: createMaterials } = useCreateClassroomMaterial({
    onSuccess(data) {
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add material.",
        variant: "destructive",
      })
    },
    topicId: topicId,
    classroomId: classId,
  })
  console.log(topicId, "material topic id")
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

  function onSubmit(values: z.infer<typeof materialFormSchema>) {
    setIsSubmitting(true);
  
    const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : null
  
    if (selectedFile) {
      // Handle uploaded file
      setTimeout(() => {
        const newMaterial = {
          title: values.title,
          description: values.description || "",
          type: values.type,
          url: fileUrl!,
        };
  
        createMaterials(newMaterial);
        form.reset();
        setSelectedFile(null);
        setIsSubmitting(false);
        onOpenChange(false);
  
        toast({
          title: "Material added",
          description: `${values.title} has been added to the class.`,
        });
      }, 1500);
    } else if (values.url && values.url.trim() !== "") {
      // Handle URL-based material
      setTimeout(() => {
        const newMaterial = {
          title: values.title,
          description: values.description || "",
          type: values.type,
          url: values.url.trim(),
        };
  
        createMaterials(newMaterial);
        form.reset();
        setIsSubmitting(false);
        onOpenChange(false);
  
        toast({
          title: "Material added",
          description: `${values.title} has been added to the class.`,
        });
      }, 500);
    } else {
      // Neither file nor URL provided
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Please provide either a file or a URL for the material.",
        variant: "destructive",
      });
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
          <Button variant={"outline"} onClick={() => setIsUploadMode(false)} className="w-full">
            Add Materials
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
