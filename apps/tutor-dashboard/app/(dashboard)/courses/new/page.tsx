"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, File, Loader2, Plus, Upload, X } from "lucide-react";
import Link from "next/link";
import type { CreateRecordedCourseRequest } from "@/lib/types/recorded-courses";
import { toast } from "@/components/ui/use-toast";
import { useCreateRecordedCourses } from "@/hooks/mutate/recorded-courses";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Course title must be at least 2 characters." })
    .nonempty("Course title is required"),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .nonempty("Course description is required"),
  category: z
    .string({ required_error: "Please select a category." })
    .nonempty("Category is required"),
  course_visibility: z.enum(["draft", "published"]),
  module: z.array(
    z.object({
      // id: z.string(),
      module_title: z.string().min(1, { message: "Module title is required" }),
      module_description: z.string().optional(),
      video: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string(),
          description: z.string().optional(),
        })
      ),
      material: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string(),
          type: z.string().optional(),
          description: z.string().optional(),
        })
      ),
    })
  ),
});

// Type for the form values
export type FormValuesType = z.infer<typeof formSchema>;

const categories = [
  { label: "Web Development", value: "Web Development" },
  { label: "Data Analytics", value: "Data Analytics" }, // { label: "Digital Marketing", value: "" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "Digital Marketing", value: "Marketing" },
];

// Cloudinary upload function
async function uploadToCloudinary(
  file: File
): Promise<{ secure_url: string; public_id: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // Default preset if not set

  try {
    // Create a FormData instance
    const formData = new FormData();
    formData.append("file", file);
    if (presetName) {
      formData.append("upload_preset", presetName);
    } else {
      toast({
        title: "Error",
        description: "Cloudinary upload preset is not defined.",
      });
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, // Replace with your cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

export default function NewCoursePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createRecordedCourse } = useCreateRecordedCourses({
    onSuccess: () => {
      toast({
        title: "Course Created",
        description: "Your course has been created successfully.",
      });
      setIsSubmitting(false);
      router.push("/courses");
    },
    onError: (error) => {
      console.error("Error creating course:", error);

      // Check if the error response has the specific validation error format
      if ((error as any)?.response?.data) {
        const errorData = (error as any)?.response?.data;

        if (errorData.errors) {
          // Format validation errors for display
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => {
              // Convert field names to more readable format
              const readableField = field
                .replace(/\./g, " ")
                .replace(/\d+/g, (match) => ` ${Number.parseInt(match) + 1} `);

              return `${readableField}: ${
                Array.isArray(messages) ? messages[0] : messages
              }`;
            })
            .join("\n");

          toast({
            title: errorData.message || "Validation Error",
            description: (
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                <ul className="list-disc pl-4 space-y-1">
                  {Object.entries(errorData.errors).map(([field, messages]) => {
                    // Make field names more readable
                    const readableField = field
                      .replace(/module\.(\d+)\.video/g, "Module $1 Video")
                      .replace(
                        /module\.(\d+)\.material/g,
                        "Module $1 Material"
                      );

                    return (
                      <li key={field} className="text-sm">
                        <span className="font-medium">{readableField}:</span>{" "}
                        {Array.isArray(messages) ? messages[0] : messages}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ),
            variant: "destructive",
          });
        } else {
          // Handle non-validation errors
          toast({
            title: "Error",
            description:
              errorData.message ||
              "An error occurred while creating the course.",
            variant: "destructive",
          });
        }
      } else {
        // Fallback for unexpected error formats
        toast({
          title: "Error",
          description:
            error.message || "An error occurred while creating the course.",
          variant: "destructive",
        });
      }

      setIsSubmitting(false);
    },
    options: {},
  });

  // Separate loading states for video and material uploads
  const [isVideoUploading, setIsVideoUploading] = useState<
    Record<number, boolean>
  >({});
  const [isMaterialUploading, setIsMaterialUploading] = useState<
    Record<number, boolean>
  >({});

  // Create form with React Hook Form
  const form = useForm<FormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      course_visibility: "draft",
      module: [
        {
          module_title: "",
          module_description: "",
          video: [],
          material: [],
        },
      ],
    },
  });

  // Use fieldArray to manage the modules array
  const {
    fields: moduleFields,
    append,
    remove,
  } = useFieldArray({
    name: "module",
    control: form.control,
  });

  // Prevent form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handle tab navigation
  const handleTabChange = (tab: string) => {
    // If moving from details tab to content tab, validate the details fields first
    if (activeTab === "details" && tab === "content") {
      // Trigger validation for the details fields
      form.trigger(["title", "description", "category"]).then((valid) => {
        if (!valid) {
          // Show toast notification for validation errors
          const errors = form.formState.errors;
          const errorMessages = [];

          if (errors.title) {
            errorMessages.push(`Title: ${errors.title.message}`);
          }
          if (errors.description && errors.description.message) {
            errorMessages.push(`Description: ${errors.description.message}`);
          }
          if (errors.category) {
            errorMessages.push(`Category: ${errors.category.message}`);
          }

          if (errorMessages.length > 0) {
            toast({
              title: "Please fix the following errors:",
              description: (
                <div className="mt-2">
                  <ul className="list-disc pl-4 space-y-1">
                    {errorMessages.map((message, index) => (
                      <li key={index} className="text-sm">
                        {message}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
              variant: "destructive",
            });
          }
          return; // Don't change tabs if validation fails
        }
        setActiveTab(tab);
      });
    } else {
      setActiveTab(tab);
    }
  };

  // Helper function to display validation errors
  const displayValidationErrors = (errorMessages: string[]) => {
    if (errorMessages.length > 0) {
      toast({
        title: "Please fix the following errors:",
        description: (
          <div className="mt-2">
            <ul className="list-disc pl-4 space-y-1">
              {errorMessages.map((message, index) => (
                <li key={index} className="text-sm">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        ),
        variant: "destructive",
      });
    }
  };

  // Handle form submission
  async function onSubmit(values: FormValuesType) {
    setIsSubmitting(true);

    // Validate that each module has at least one video and one material
    const moduleErrors: Record<string, string[]> = {};

    values.module.forEach((mod, index) => {
      if (!mod.video || mod.video.length === 0) {
        moduleErrors[`module.${index}.video`] = [
          "The module video field is required.",
        ];
      }

      if (!mod.material || mod.material.length === 0) {
        moduleErrors[`module.${index}.material`] = [
          "The module material field is required.",
        ];
      }
    });

    // If there are validation errors, display them and stop submission
    if (Object.keys(moduleErrors).length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <div className="mt-2 max-h-[200px] overflow-y-auto">
            <ul className="list-disc pl-4 space-y-1">
              {Object.entries(moduleErrors).map(([field, messages]) => {
                // Make field names more readable
                const readableField = field
                  .replace(/module\.(\d+)\.video/g, "Module $1 Video")
                  .replace(/module\.(\d+)\.material/g, "Module $1 Material");

                return (
                  <li key={field} className="text-sm">
                    <span className="font-medium">{readableField}:</span>{" "}
                    {Array.isArray(messages) ? messages[0] : messages}
                  </li>
                );
              })}
            </ul>
          </div>
        ),
        variant: "destructive",
      });

      setIsSubmitting(false);
      setActiveTab("content");
      return;
    }

    console.log("Form submission payload:", values);

    // Format the data as needed for your API
    const payload: CreateRecordedCourseRequest = {
      details: {
        title: values.title,
        description: values.description || "",
        course: values.category,
        course_visibility: values.course_visibility,
      },
      module: values.module.map((mod) => ({
        module_title: mod.module_title,
        module_description: mod.module_description || "",
        video: mod.video.map((video) => ({
          public_id: video.id, // Include the id
          title: video.title,
          url: video.url,
          description: video.description || "",
        })),
        material: mod.material.map((material) => ({
          public_id: material.id, // Include the id
          title: material.title,
          url: material.url,
          type: (material.type as "PDF" | "DOC" | "LINK") || "PDF",
          description: material.description || "",
        })),
      })),
    };

    // Call the mutation directly - error handling is in the onError callback
    createRecordedCourse(payload);
    console.log("Ready to send to backend:", payload);
  }

  // File upload handlers with separate loading states
  const handleVideoUpload = async (moduleIndex: number, file: File) => {
    try {
      // Update the loading state for this specific module
      setIsVideoUploading((prev) => ({ ...prev, [moduleIndex]: true }));

      // Upload file to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Update the form state with the new video
      const currentVideos = form.getValues(`module.${moduleIndex}.video`) || [];

      form.setValue(`module.${moduleIndex}.video`, [
        ...currentVideos,
        {
          id: cloudinaryUrl.public_id,
          title: file.name,
          url: cloudinaryUrl.secure_url,
          description: "",
        },
      ]);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVideoUploading((prev) => ({ ...prev, [moduleIndex]: false }));
    }
  };

  const handleMaterialUpload = async (moduleIndex: number, file: File) => {
    try {
      // Update the loading state for this specific module
      setIsMaterialUploading((prev) => ({ ...prev, [moduleIndex]: true }));

      // Upload file to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Update the form state with the new material
      const currentMaterials =
        form.getValues(`module.${moduleIndex}.material`) || [];

      form.setValue(`module.${moduleIndex}.material`, [
        ...currentMaterials,
        {
          id: cloudinaryUrl.public_id,
          title: file.name,
          url: cloudinaryUrl.secure_url,
          type: getFileType(file.name),
          description: "",
        },
      ]);
    } catch (error) {
      console.error("Error uploading material:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload material. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMaterialUploading((prev) => ({ ...prev, [moduleIndex]: false }));
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent, index: number, type: string) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (
    e: React.DragEvent,
    moduleIndex: number,
    type: "video" | "material"
  ) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (type === "video") {
      await handleVideoUpload(moduleIndex, file);
    } else {
      await handleMaterialUpload(moduleIndex, file);
    }
  };

  // Helper function to determine file type
  const getFileType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "PDF";
      case "doc":
      case "docx":
        return "DOC"; // Changed from "Word" to "DOC"
      case "ppt":
      case "pptx":
      case "xls":
      case "xlsx":
        return "DOC"; // Changed from specific types to "DOC"
      default:
        // For URLs or other types, default to LINK
        if (fileName.startsWith("http")) {
          return "LINK";
        }
        return "PDF"; // Default to PDF for unknown types
    }
  };

  // Handle removing items from modules
  const removeItem = (
    moduleIndex: number,
    itemId: string,
    type: "video" | "material"
  ) => {
    const currentItems = form.getValues(`module.${moduleIndex}.${type}`) || [];
    const updatedItems = currentItems.filter((item) => item.id !== itemId);
    form.setValue(`module.${moduleIndex}.${type}`, updatedItems);
  };

  // Create refs for file inputs
  const videoInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const materialInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
          <CardDescription>
            Fill in the details to create a new pre-recorded course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                onKeyDown={handleKeyDown}
              >
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Course Title{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Introduction to Algebra"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The title of your course as it will appear to
                          students.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief description of the course"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description of what students will learn.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The category this course belongs to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-4">
                    {moduleFields.map((moduleField, moduleIndex) => (
                      <Card key={moduleField.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between relative">
                            <div className="flex flex-col gap-4 w-full">
                              <FormField
                                control={form.control}
                                name={`module.${moduleIndex}.module_title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Module Title</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={`Module ${
                                          moduleIndex + 1
                                        } Title`}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`module.${moduleIndex}.module_description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Module Description</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Description"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            {moduleFields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -top-5 -right-5"
                                onClick={() => remove(moduleIndex)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Videos <span className="text-destructive">*</span>
                            </h4>
                            <div
                              className={`border-2 border-dashed rounded-lg p-4 ${
                                dragOver
                                  ? "border-primary bg-primary/5"
                                  : form.formState.errors.module?.[moduleIndex]
                                      ?.video
                                  ? "border-destructive"
                                  : "border-border"
                              }`}
                              onDragOver={(e) =>
                                handleDragOver(e, moduleIndex, "video")
                              }
                              onDragLeave={handleDragLeave}
                              onDrop={(e) =>
                                handleDrop(e, moduleIndex, "video")
                              }
                            >
                              <div className="space-y-2">
                                {form
                                  .watch(`module.${moduleIndex}.video`)
                                  ?.map((video, vidIndex) => (
                                    <div
                                      key={video.id}
                                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                                    >
                                      <div className="flex items-center gap-2">
                                        <File className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {video.title}
                                        </span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          removeItem(
                                            moduleIndex,
                                            video.id,
                                            "video"
                                          )
                                        }
                                        type="button"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                              </div>

                              <div className="flex flex-col items-center justify-center py-4 gap-2 mt-2">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Drag and drop video files here or click to
                                  browse
                                </p>
                                <input
                                  type="file"
                                  id={`video-upload-${moduleIndex}`}
                                  className="hidden"
                                  accept="video/*"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleVideoUpload(
                                        moduleIndex,
                                        e.target.files[0]
                                      );
                                    }
                                  }}
                                  ref={(el) => {
                                    if (!videoInputRefs.current)
                                      videoInputRefs.current = [];
                                    videoInputRefs.current[moduleIndex] = el;
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    videoInputRefs.current?.[
                                      moduleIndex
                                    ]?.click();
                                  }}
                                  disabled={isVideoUploading[moduleIndex]}
                                >
                                  {isVideoUploading[moduleIndex] ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Video
                                    </>
                                  )}
                                </Button>
                              </div>
                              {form.formState.errors.module?.[moduleIndex]
                                ?.video && (
                                <p className="text-sm text-destructive mt-2">
                                  Please upload at least one video for this
                                  module
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Materials{" "}
                              <span className="text-destructive">*</span>
                            </h4>
                            <div
                              className={`border-2 border-dashed rounded-lg p-4 ${
                                dragOver
                                  ? "border-primary bg-primary/5"
                                  : form.formState.errors.module?.[moduleIndex]
                                      ?.material
                                  ? "border-destructive"
                                  : "border-border"
                              }`}
                              onDragOver={(e) =>
                                handleDragOver(e, moduleIndex, "material")
                              }
                              onDragLeave={handleDragLeave}
                              onDrop={(e) =>
                                handleDrop(e, moduleIndex, "material")
                              }
                            >
                              <div className="space-y-2">
                                {form
                                  .watch(`module.${moduleIndex}.material`)
                                  ?.map((material, matIndex) => (
                                    <div
                                      key={material.id}
                                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                                    >
                                      <div className="flex items-center gap-2">
                                        <File className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {material.title}
                                        </span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          removeItem(
                                            moduleIndex,
                                            material.id,
                                            "material"
                                          )
                                        }
                                        type="button"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                              </div>

                              <div className="flex flex-col items-center justify-center py-4 gap-2 mt-2">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Drag and drop PDF/PPT files here or click to
                                  browse
                                </p>
                                <input
                                  type="file"
                                  id={`material-upload-${moduleIndex}`}
                                  className="hidden"
                                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleMaterialUpload(
                                        moduleIndex,
                                        e.target.files[0]
                                      );
                                    }
                                  }}
                                  ref={(el) => {
                                    if (!materialInputRefs.current)
                                      materialInputRefs.current = [];
                                    materialInputRefs.current[moduleIndex] = el;
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    materialInputRefs.current?.[
                                      moduleIndex
                                    ]?.click();
                                  }}
                                  disabled={isMaterialUploading[moduleIndex]}
                                >
                                  {isMaterialUploading[moduleIndex] ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Material
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            {form.formState.errors.module?.[moduleIndex]
                              ?.material && (
                              <p className="text-sm text-destructive mt-2">
                                Please upload at least one material for this
                                module
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        append({
                          // id: crypto.randomUUID(),
                          module_title: "",
                          module_description: "",
                          video: [],
                          material: [],
                        });
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="course_visibility"
                      render={({ field }) => (
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Course Visibility</h3>
                            <p className="text-sm text-muted-foreground">
                              Control whether students can see this course
                            </p>
                          </div>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                  </div>
                </TabsContent>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/courses")}
                  >
                    Cancel
                  </Button>
                  {activeTab !== "details" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (activeTab === "content") setActiveTab("details");
                        if (activeTab === "settings") setActiveTab("content");
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeTab !== "settings" ? (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // Explicitly prevent any form submission
                        if (activeTab === "details") {
                          // Validate details fields before proceeding
                          form
                            .trigger(["title", "description", "category"])
                            .then((valid) => {
                              if (valid) {
                                setActiveTab("content");
                              } else {
                                // Show toast notification for validation errors
                                const errors = form.formState.errors;
                                const errorMessages = [];

                                if (errors.title) {
                                  errorMessages.push(
                                    `Title: ${errors.title.message}`
                                  );
                                }
                                if (
                                  errors.description &&
                                  errors.description.message
                                ) {
                                  errorMessages.push(
                                    `Description: ${errors.description.message}`
                                  );
                                }
                                if (errors.category) {
                                  errorMessages.push(
                                    `Category: ${errors.category.message}`
                                  );
                                }

                                displayValidationErrors(errorMessages);
                              }
                            });
                        }
                        if (activeTab === "content") {
                          // Validate that all modules have titles before proceeding
                          const modules = form.getValues("module");
                          const missingTitles = modules.some(
                            (mod) =>
                              !mod.module_title ||
                              mod.module_title.trim() === ""
                          );

                          if (missingTitles) {
                            toast({
                              title: "Missing Module Titles",
                              description:
                                "Please provide a title for all modules before proceeding to settings.",
                              variant: "destructive",
                            });
                            return;
                          }

                          // Also check for videos and materials
                          const moduleErrors: Record<string, string[]> = {};

                          modules.forEach((mod, index) => {
                            if (!mod.video || mod.video.length === 0) {
                              moduleErrors[`module.${index}.video`] = [
                                "The module video field is required.",
                              ];
                            }

                            if (!mod.material || mod.material.length === 0) {
                              moduleErrors[`module.${index}.material`] = [
                                "The module material field is required.",
                              ];
                            }
                          });

                          if (Object.keys(moduleErrors).length > 0) {
                            toast({
                              title: "Validation Error",
                              description: (
                                <div className="mt-2 max-h-[200px] overflow-y-auto">
                                  <ul className="list-disc pl-4 space-y-1">
                                    {Object.entries(moduleErrors).map(
                                      ([field, messages]) => {
                                        // Make field names more readable
                                        const readableField = field
                                          .replace(
                                            /module\.(\d+)\.video/g,
                                            "Module $1 Video"
                                          )
                                          .replace(
                                            /module\.(\d+)\.material/g,
                                            "Module $1 Material"
                                          );

                                        return (
                                          <li key={field} className="text-sm">
                                            <span className="font-medium">
                                              {readableField}:
                                            </span>{" "}
                                            {Array.isArray(messages)
                                              ? messages[0]
                                              : messages}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              ),
                              variant: "destructive",
                            });
                            return;
                          }

                          setActiveTab("settings");
                        }
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={(e) => {
                        // Only for the submit button, we want the form submission to happen
                        // This is just to make it explicit
                        if (isSubmitting) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Course...
                        </>
                      ) : (
                        "Create Course"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
