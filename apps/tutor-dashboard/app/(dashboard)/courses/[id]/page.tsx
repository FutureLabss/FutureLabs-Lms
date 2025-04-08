"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Eye,
  File,
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

// Mock data for a specific course
const courseData = {
  id: "1",
  title: "Introduction to Algebra",
  description:
    "Learn the fundamentals of algebra with this comprehensive course. Perfect for beginners and those looking to refresh their knowledge.",
  category: "mathematics",
  thumbnail: "/placeholder.svg",
  status: "published",
  tutorId: "1",
  students: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "/placeholder.svg",
    },
  ],
  modules: [
    {
      id: "1",
      title: "Basic Concepts",
      videos: [
        {
          id: "1",
          title: "Introduction to Variables",
          description: "Understanding variables in algebra",
          url: "#",
          duration: 600,
          thumbnail: "/placeholder.svg",
        },
        {
          id: "2",
          title: "Working with Equations",
          description: "How to solve basic equations",
          url: "#",
          duration: 720,
          thumbnail: "/placeholder.svg",
        },
      ],
      materials: [
        {
          id: "1",
          title: "Algebra Basics PDF",
          description: "A comprehensive guide to algebra basics",
          type: "pdf",
          url: "#",
          createdAt: "2023-08-15",
        },
      ],
    },
    {
      id: "2",
      title: "Intermediate Concepts",
      videos: [
        {
          id: "3",
          title: "Quadratic Equations",
          description: "Solving quadratic equations",
          url: "#",
          duration: 840,
          thumbnail: "/placeholder.svg",
        },
      ],
      materials: [
        {
          id: "2",
          title: "Practice Problems",
          description: "Practice problems for intermediate algebra",
          type: "pdf",
          url: "#",
          createdAt: "2023-08-20",
        },
      ],
    },
  ],
  createdAt: "2023-08-01",
  updatedAt: "2023-08-25",
};

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false);
  const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(
    courseData.status === "published"
  );

  // In a real application, you would fetch the course data based on the ID
  const courseId = params.id as string;

  const handleAddVideo = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsAddVideoDialogOpen(true);
  };

  const handleAddMaterial = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsAddMaterialDialogOpen(true);
  };

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
            {courseData.title}
          </h1>
          <p className="text-muted-foreground">{courseData.category}</p>
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
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {courseData.description}
                  </p>
                </div>

                <div className="aspect-video relative overflow-hidden rounded-lg border">
                  <img
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
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
                {courseData.modules.map((module) => (
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
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
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
                                    {Math.floor(video.duration / 60)}:
                                    {(video.duration % 60)
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
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
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
                                      material.createdAt
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
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
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
                    {courseData.students.map((student) => (
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
                      isPublished
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                    }`}
                  >
                    {isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-sm">{courseData.students.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Modules</span>
                  <span className="text-sm">{courseData.modules.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Videos</span>
                  <span className="text-sm">
                    {courseData.modules.reduce(
                      (acc, module) => acc + module.videos.length,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Materials</span>
                  <span className="text-sm">
                    {courseData.modules.reduce(
                      (acc, module) => acc + module.materials.length,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm">
                    {new Date(courseData.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm">
                    {new Date(courseData.updatedAt).toLocaleDateString()}
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
                    <span className="text-sm">75%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Average Progress
                    </span>
                    <span className="text-sm">60%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "60%" }}
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
              onClick={() => {
                setIsDeleteDialogOpen(false);
                router.push("/courses");
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Create a new module for this course.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to the Course"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of this module"
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddModuleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddModuleDialogOpen(false)}>
              Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Video Dialog */}
      <Dialog
        open={isAddVideoDialogOpen}
        onOpenChange={setIsAddVideoDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
            <DialogDescription>
              Upload a new video to this module.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input
                id="videoTitle"
                placeholder="e.g., Introduction to Variables"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoDescription">Description (Optional)</Label>
              <Textarea
                id="videoDescription"
                placeholder="Provide a brief description of this video"
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoFile">Video File</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop your video file here or click to browse
                </p>
                <Input
                  type="file"
                  id="videoFile"
                  className="hidden"
                  accept="video/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    document.getElementById("videoFile")?.click();
                  }}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddVideoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddVideoDialogOpen(false)}>
              Upload Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Material Dialog */}
      <Dialog
        open={isAddMaterialDialogOpen}
        onOpenChange={setIsAddMaterialDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Material</DialogTitle>
            <DialogDescription>
              Upload a new material to this module.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="materialTitle">Material Title</Label>
              <Input id="materialTitle" placeholder="e.g., Practice Problems" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materialDescription">
                Description (Optional)
              </Label>
              <Textarea
                id="materialDescription"
                placeholder="Provide a brief description of this material"
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="materialFile">Material File (PDF/PPT)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here or click to browse
                </p>
                <Input
                  type="file"
                  id="materialFile"
                  className="hidden"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    document.getElementById("materialFile")?.click();
                  }}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddMaterialDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddMaterialDialogOpen(false)}>
              Upload Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
