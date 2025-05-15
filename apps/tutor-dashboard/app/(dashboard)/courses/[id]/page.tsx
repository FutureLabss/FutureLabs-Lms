"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { set, z } from "zod";
import {
  ArrowLeft,
  Edit,
  Eye,
  File,
  Loader,
  MoreHorizontal,
  Plus,
  Trash,
  Upload,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useGetSingleRecordedCourse } from "@/hooks/query/recorded-course";
import CourseDetailsSkeletonLoader from "../../../../components/SkeletonLoader";
import {
  useAddModule,
  useDeleteModule,
  useDeleteRecordedCourses,
  useAddCourseVideo,
  useAddCourseMaterial,
  useDeleteCourseModuleVideo,
  useDeleteCourseModuleMaterial,
} from "@/hooks/mutate/recorded-courses";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Cloudinary upload function
async function uploadToCloudinary(
  file: File
): Promise<{ secure_url: string; public_id: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

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
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
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

// Helper function to determine file type
const getFileType = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "DOC";
    case "ppt":
    case "pptx":
    case "xls":
    case "xlsx":
      return "DOC";
    default:
      // For URLs or other types, default to LINK
      if (fileName.startsWith("http")) {
        return "LINK";
      }
      return "PDF"; // Default to PDF for unknown types
  }
};

const moduleFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Module title is required" })
    .nonempty("Course title is required"),
  description: z.string().optional(),
});

const videoFormSchema = z.object({
  title: z.string().min(1, { message: "Video title is required" }),
  description: z.string().optional(),
  file: z
    .any()
    .refine((val) => val instanceof File, { message: "Video file is required" })
    .optional(),
  url: z.string().optional(),
});

const materialFormSchema = z.object({
  title: z.string().min(1, { message: "Material title is required" }),
  description: z.string().optional(),
  file: z
    .any()
    .refine((val) => val instanceof File, {
      message: "Material file is required",
    })
    .optional(),
  type: z.string().min(1, { message: "Material type is required" }),
  url: z.string().optional(),
});

export interface ModuleTypeData {
  id: number | null;
  title: string;
  description?: string;
}

export interface VideoTypeData {
  moduleId: number | null;
  data: {
    title: string;
    description?: string;
    url?: string;
  };
}

export interface MaterialTypeData {
  moduleId: number | null;
  data: {
    title: string;
    description?: string;
    type: string;
    url?: string;
  };
}

export type ModuleSchemaType = z.infer<typeof moduleFormSchema>;
export type VideoSchemaType = z.infer<typeof videoFormSchema>;
export type MaterialSchemaType = z.infer<typeof materialFormSchema>;

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;

  console.log(typeof courseId);

  const { data: singleCourse, loading: isLoading } = useGetSingleRecordedCourse(
    Number(courseId)
  );

  console.log("singleCourse", singleCourse?.data?.modules);

  const { mutate: deleteModule } = useDeleteModule({
    onSuccess: () => {
      toast({
        title: "Module deleted",
        description: "The module has been successfully deleted.",
        variant: "default",
      });
      setIsDeleteModuleDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while deleting the module.",
        variant: "destructive",
      });
      // Handle error
    },
  });
  const { mutate: deleteRecordedCourse } = useDeleteRecordedCourses({
    onSuccess: () => {
      toast({
        title: "Course deleted",
        description: "The course has been successfully deleted.",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      router.push("/courses");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while deleting the course.",
        variant: "destructive",
      });
      // Handle error
    },
  });

  const { mutate: addModule } = useAddModule({
    onSuccess: () => {
      toast({
        title: "Module added",
        description: "The module has been successfully added.",
        variant: "default",
      });
      form.reset();
      setIsAddModuleDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while adding the module.",
        variant: "destructive",
      });
      // Handle error
    },
  });

  const { mutate: addVideo, isLoading: isAddingVideo } = useAddCourseVideo({
    onSuccess: () => {
      toast({
        title: "Video added",
        description: "The video has been successfully added.",
        variant: "default",
      });
      videoForm.reset();
      setIsAddVideoDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while adding the video.",
        variant: "destructive",
      });
    },
  });

  const { mutate: addMaterial, isLoading: isAddingMaterial } =
    useAddCourseMaterial({
      onSuccess: () => {
        toast({
          title: "Material added",
          description: "The material has been successfully added.",
          variant: "default",
        });
        materialForm.reset();
        setIsAddMaterialDialogOpen(false);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An error occurred while adding the material.",
          variant: "destructive",
        });
      },
    });

  const { mutate: deleteCourseModuleVideo, isLoading: isDeletingVideo } =
    useDeleteCourseModuleVideo({
      onSuccess: () => {
        toast({
          title: "Material deleted",
          description: "The material has been successfully deleted.",
          variant: "default",
        });
        setIsDeleteVideoDialogOpen(false);
        setSelectedVideoId(null);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An error occurred while deleting the material.",
          variant: "destructive",
        });
        // Handle error
      },
    });
  const { mutate: deleteCourseModuleMaterial, isLoading: isDeletingMaterial } =
    useDeleteCourseModuleMaterial({
      onSuccess: () => {
        toast({
          title: "Video deleted",
          description: "The video has been successfully deleted.",
          variant: "default",
        });
        setIsDeleteMaterialDialogOpen(false);
        setSelectedVideoId(null);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An error occurred while deleting the video.",
          variant: "destructive",
        });
        // Handle error
      },
    });

  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteVideoDialogOpen, setIsDeleteVideoDialogOpen] = useState(false);
  const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] =
    useState(false);
  const [isDeleteMaterialDialogOpen, setIsDeleteMaterialDialogOpen] =
    useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);
  const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [isPublished, setIsPublished] = useState(
    singleCourse?.data?.status === "published"
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(
    null
  );

  const [dragOverVideo, setDragOverVideo] = useState(false);
  const [dragOverMaterial, setDragOverMaterial] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploadingVideo, setUploadingVideo] = useState(false);
  const [isUploadingMaterial, setUploadingMaterial] = useState(false);
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const materialInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ModuleSchemaType>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const videoForm = useForm<VideoSchemaType>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  const materialForm = useForm<MaterialSchemaType>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
    },
  });

  console.log(form.formState);

  async function onSubmit(data: ModuleSchemaType) {
    const moduleData: ModuleTypeData = {
      id: Number(courseId) || null,
      title: data.title,
      description: data.description,
    };

    try {
      addModule(moduleData);
    } catch (error) {
      throw error;
    }
  }

  async function handleAddVideos(data: VideoSchemaType) {
    setUploadingVideo(true);
    try {
      if (!videoFile) {
        toast({
          title: "Error",
          description: "Please select a video file to upload.",
          variant: "destructive",
        });
        return;
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(videoFile);

      const videoData: VideoTypeData = {
        moduleId: selectedModuleId ?? 0, // Provide a default value (e.g., 0) if selectedModuleId is null
        data: {
          title: data.title,
          description: data.description,
          url: cloudinaryResponse.secure_url,
        },
      };

      // Add the public_id from Cloudinary
      // const videoWithId = {
      //   ...videoData,
      //   public_id: cloudinaryResponse.public_id,
      // };

      addVideo(videoData);

      setUploadingVideo(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the video.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploadingVideo(false);
    }
  }

  async function handleAddMaterials(data: MaterialSchemaType) {
    setUploadingMaterial(true);
    try {
      if (!materialFile) {
        toast({
          title: "Error",
          description: "Please select a material file to upload.",
          variant: "destructive",
        });
        return;
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(materialFile);

      const materialData: MaterialTypeData = {
        moduleId: selectedModuleId,
        data: {
          title: data.title,
          description: data.description,
          type: getFileType(materialFile.name),
          url: cloudinaryResponse.secure_url,
        },
      };

      // Add the public_id from Cloudinary
      // const materialWithId = {
      //   ...materialData,
      //   public_id: cloudinaryResponse.public_id,
      // };

      addMaterial(materialData);

      setUploadingMaterial(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the material.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setUploadingMaterial(false);
    }
  }

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverVideo(true);
  };

  const handleVideoDragLeave = () => {
    setDragOverVideo(false);
  };

  const handleVideoDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverVideo(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setVideoFile(file);
    videoForm.setValue("title", file.name);
  };

  // Handle drag and drop for material
  const handleMaterialDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverMaterial(true);
  };

  const handleMaterialDragLeave = () => {
    setDragOverMaterial(false);
  };

  const handleMaterialDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverMaterial(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setMaterialFile(file);
    materialForm.setValue("title", file.name);
  };

  // In a real application, you would fetch the course data based on the ID

  const handleAddVideo = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setIsAddVideoDialogOpen(true);
  };

  const handleAddMaterial = (moduleId: number) => {
    setSelectedModuleId(moduleId);
    setIsAddMaterialDialogOpen(true);
  };

  function handleDeleteModule() {
    if (selectedModuleId !== null) {
      deleteModule({ id: Number(courseId), moduleId: selectedModuleId });
    } else {
      toast({
        title: "Error",
        description: "Module ID is missing.",
        variant: "destructive",
      });
    }
  }

  function handleDeleteCourseVideo() {
    if (selectedVideoId !== null && selectedModuleId !== null) {
      deleteCourseModuleVideo({
        moduleId: selectedModuleId,
        videoId: selectedVideoId,
      });
    } else {
      toast({
        title: "Error",
        description: "Video ID is missing.",
        variant: "destructive",
      });
    }
  }

  function handleDeleteCourseMaterial() {
    if (selectedMaterialId !== null && selectedModuleId !== null) {
      deleteCourseModuleMaterial({
        moduleId: selectedModuleId,
        materialId: selectedMaterialId,
      });
    } else {
      toast({
        title: "Error",
        description: "Material ID is missing.",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return <CourseDetailsSkeletonLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {singleCourse?.data?.title}
          </h1>
          <p className="text-muted-foreground">{singleCourse?.data?.course}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/courses/${courseId}/preview`}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/courses/${courseId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate Course</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="space-y-4 md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>
                View and manage course information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {singleCourse?.data?.description}
                    </p>
                  </div>

                  <div className="aspect-video relative overflow-hidden rounded-lg border">
                    <img
                      src={
                        singleCourse?.data?.image_url !== "N/A"
                          ? singleCourse?.data?.image_url
                          : "/placeholder.svg"
                      }
                      alt={singleCourse?.data?.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              }
            </CardContent>
          </Card>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Modules</h2>
                <Button onClick={() => setIsAddModuleDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-4">
                {singleCourse?.data?.modules?.map((module) => (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{module.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Module</DropdownMenuItem>
                            <DropdownMenuItem>Reorder Module</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setIsDeleteModuleDialogOpen(true),
                                  setSelectedModuleId(module.id);
                              }}
                            >
                              Delete Module
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Videos</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddVideo(module.id)}
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            Add Video
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {module.videos.map((video) => (
                            <div
                              key={video.id}
                              className="flex items-center justify-between p-2 bg-muted rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">
                                    {video.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {Math.floor(video.duration_in_seconds / 60)}
                                    :
                                    {(video.duration_in_seconds % 60)
                                      .toString()
                                      .padStart(2, "0")}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={video.url}>Preview</Link>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Replace Video
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => {
                                        setIsDeleteVideoDialogOpen(true),
                                          setSelectedModuleId(module.id),
                                          setSelectedVideoId(video.id);
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Materials</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddMaterial(module.id)}
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            Add Material
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {module.materials.map((material) => (
                            <div
                              key={material.id}
                              className="flex items-center justify-between p-2 bg-muted rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <File className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">
                                    {material.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {material.type.toUpperCase()} • Added on{" "}
                                    {new Date(
                                      material.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={material.url}>View</Link>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => {
                                        setIsDeleteMaterialDialogOpen(true),
                                          setSelectedModuleId(module.id),
                                          setSelectedMaterialId(material.id);
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Enrolled Students</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Enroll Student
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {singleCourse?.data?.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Progress</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Unenroll
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                  <CardDescription>
                    Manage your course settings and visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-y-2">
                    <div>
                      <h3 className="font-medium">Course Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        {isPublished
                          ? "Your course is currently published and visible to students."
                          : "Your course is currently in draft mode and not visible to students."}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={isPublished}
                        onCheckedChange={setIsPublished}
                      />
                      <Label htmlFor="published">
                        {isPublished ? "Published" : "Draft"}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      singleCourse?.data?.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                    }`}
                  >
                    {singleCourse?.data?.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-sm">
                    {singleCourse?.data?.students.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Modules</span>
                  <span className="text-sm">
                    {singleCourse?.data?.modules.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Videos</span>
                  <span className="text-sm">
                    {singleCourse?.data?.modules.reduce(
                      (acc, module) => acc + module.videos.length,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Materials</span>
                  <span className="text-sm">
                    {singleCourse?.data?.modules.reduce(
                      (acc, module) => acc + module.materials.length,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm">
                    {singleCourse?.data?.course_status?.created_at}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm">
                    {singleCourse?.data?.course_status?.updated_at}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm">
                      {singleCourse?.data?.students_progress?.completion_rate}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${singleCourse?.data?.students_progress?.completion_rate}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Average Progress
                    </span>
                    <span className="text-sm">
                      {singleCourse?.data?.students_progress?.average_progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${singleCourse?.data?.students_progress?.average_progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (singleCourse?.data?.id !== undefined) {
                  deleteRecordedCourse({ id: singleCourse.data.id });
                } else {
                  toast({
                    title: "Error",
                    description: "Course ID is missing.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Module Dialogue */}

      <Dialog
        open={isDeleteModuleDialogOpen}
        onOpenChange={setIsDeleteModuleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Module</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this module? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModuleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (singleCourse?.data?.id !== undefined) {
                  handleDeleteModule();
                } else {
                  toast({
                    title: "Error",
                    description: "Course ID is missing.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Module Dialog */}
      <Dialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
      >
        <Form {...form}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Module</DialogTitle>
              <DialogDescription>
                Create a new module for this course.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Module Title <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Introduction to Algebra"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The title of your course as it will appear to students.
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
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Provide a brief description of this module"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* </div> */}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddModuleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // onClick={() => setIsAddModuleDialogOpen(false)}
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  Add Module
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>

      {/* Add Video Dialog */}
      <Dialog
        open={isAddVideoDialogOpen}
        onOpenChange={setIsAddVideoDialogOpen}
      >
        <Form {...videoForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Video</DialogTitle>
              <DialogDescription>
                Upload a new video to this module.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={videoForm.handleSubmit(handleAddVideos)}
              className="space-y-8"
            >
              <div className="space-y-4 py-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 ${
                    dragOverVideo
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onDragOver={handleVideoDragOver}
                  onDragLeave={handleVideoDragLeave}
                  onDrop={handleVideoDrop}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {videoFile
                      ? videoFile.name
                      : "Drag and drop your video file here or click to browse"}
                  </p>
                  <Input
                    type="file"
                    id="videoFile"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setVideoFile(file);
                        videoForm.setValue("title", file.name);
                      }
                    }}
                    ref={videoInputRef}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      videoInputRef.current?.click();
                    }}
                  >
                    Choose File
                  </Button>
                </div>

                <FormField
                  control={videoForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Video Title <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Introduction to Variables"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={videoForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a brief description of this video"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddVideoDialogOpen(false);
                    videoForm.reset();
                    setVideoFile(null);
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isAddingVideo ||
                    !videoFile ||
                    !videoForm.formState.isDirty ||
                    isUploadingVideo
                  }
                >
                  {isAddingVideo || isUploadingVideo ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>

      {/* Add Material Dialog */}
      <Dialog
        open={isAddMaterialDialogOpen}
        onOpenChange={setIsAddMaterialDialogOpen}
      >
        <Form {...materialForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Material</DialogTitle>
              <DialogDescription>
                Upload a new material to this module.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={materialForm.handleSubmit(handleAddMaterials)}
              className="space-y-8"
            >
              <div className="space-y-4 py-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 ${
                    dragOverMaterial
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onDragOver={handleMaterialDragOver}
                  onDragLeave={handleMaterialDragLeave}
                  onDrop={handleMaterialDrop}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {materialFile
                      ? materialFile.name
                      : "Drag and drop your file here or click to browse"}
                  </p>
                  <Input
                    type="file"
                    id="materialFile"
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx,.xls"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setMaterialFile(file);
                        materialForm.setValue("title", file.name);
                      }
                    }}
                    ref={materialInputRef}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      materialInputRef.current?.click();
                    }}
                  >
                    Choose File
                  </Button>
                </div>

                <FormField
                  control={materialForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Material Title{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Practice Problems"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={materialForm.control}
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
                  control={materialForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Type</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="PDF">PDF</option>
                          <option value="DOC">Document</option>
                          <option value="LINK">Link</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddMaterialDialogOpen(false);
                    materialForm.reset();
                    setMaterialFile(null);
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isAddingMaterial ||
                    !materialFile ||
                    !materialForm.formState.isDirty ||
                    isUploadingMaterial
                  }
                >
                  {isAddingMaterial || isUploadingMaterial ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Material"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>

      {/*? Delete modal for video */}

      <Dialog
        open={isDeleteVideoDialogOpen}
        onOpenChange={setIsDeleteVideoDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteVideoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (singleCourse?.data?.id !== undefined) {
                  handleDeleteCourseVideo();
                } else {
                  toast({
                    title: "Error",
                    description: "Course ID is missing.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              {isDeletingVideo ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDeleteMaterialDialogOpen}
        onOpenChange={setIsDeleteMaterialDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Material</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Material? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteMaterialDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (singleCourse?.data?.id !== undefined) {
                  handleDeleteCourseMaterial();
                } else {
                  toast({
                    title: "Error",
                    description: "Course ID is missing.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              {isDeletingMaterial ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
