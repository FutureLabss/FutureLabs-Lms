"use client"

import { useState } from "react"
import { Bell, Download, FileText, FolderOpen, Plus, Search, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ResourcesContent() {
  const [activeTab, setActiveTab] = useState("documents")

  // Sample documents data
  const documents = [
    {
      id: "doc1",
      name: "Course Curriculum Guide.pdf",
      type: "PDF",
      size: "2.4 MB",
      modified: "2023-10-15",
      author: "Thomas Anderson",
    },
    {
      id: "doc2",
      name: "Student Handbook 2023.docx",
      type: "Word",
      size: "1.8 MB",
      modified: "2023-10-10",
      author: "Lisa Wong",
    },
    {
      id: "doc3",
      name: "Teaching Best Practices.pptx",
      type: "PowerPoint",
      size: "5.2 MB",
      modified: "2023-09-28",
      author: "Michael Chen",
    },
    {
      id: "doc4",
      name: "Grading Rubric Template.xlsx",
      type: "Excel",
      size: "0.9 MB",
      modified: "2023-09-15",
      author: "Thomas Anderson",
    },
    {
      id: "doc5",
      name: "Course Evaluation Form.pdf",
      type: "PDF",
      size: "1.2 MB",
      modified: "2023-09-05",
      author: "Sarah Johnson",
    },
  ]

  // Sample templates data
  const templates = [
    {
      id: "temp1",
      name: "Course Syllabus Template",
      type: "Word",
      size: "1.1 MB",
      modified: "2023-10-01",
      author: "Thomas Anderson",
    },
    {
      id: "temp2",
      name: "Assignment Template",
      type: "Word",
      size: "0.8 MB",
      modified: "2023-09-20",
      author: "Lisa Wong",
    },
    {
      id: "temp3",
      name: "Lesson Plan Template",
      type: "Word",
      size: "1.3 MB",
      modified: "2023-09-15",
      author: "Michael Chen",
    },
    {
      id: "temp4",
      name: "Student Progress Report",
      type: "Excel",
      size: "1.5 MB",
      modified: "2023-09-10",
      author: "Sarah Johnson",
    },
  ]

  // Sample media data
  const media = [
    {
      id: "media1",
      name: "Introduction to UI Design.mp4",
      type: "Video",
      size: "45.2 MB",
      modified: "2023-10-12",
      author: "Thomas Anderson",
    },
    {
      id: "media2",
      name: "Color Theory Basics.mp4",
      type: "Video",
      size: "38.7 MB",
      modified: "2023-10-05",
      author: "Lisa Wong",
    },
    {
      id: "media3",
      name: "Typography Fundamentals.mp3",
      type: "Audio",
      size: "12.5 MB",
      modified: "2023-09-25",
      author: "Michael Chen",
    },
    {
      id: "media4",
      name: "Design Systems Overview.mp4",
      type: "Video",
      size: "52.1 MB",
      modified: "2023-09-18",
      author: "Sarah Johnson",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-6 w-6 text-red-500" />
      case "Word":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "PowerPoint":
        return <FileText className="h-6 w-6 text-orange-500" />
      case "Excel":
        return <FileText className="h-6 w-6 text-green-500" />
      case "Video":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-purple-500"
          >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
        )
      case "Audio":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-cyan-500"
          >
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        )
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full bg-muted pl-8 md:w-[240px] lg:w-[320px]" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium md:inline-block">Admin</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
              <p className="text-muted-foreground">Manage documents, templates, and media files</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline">
                <FolderOpen className="mr-2 h-4 w-4" />
                New Folder
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>Manage your documents and files</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search documents..." className="w-full sm:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Modified</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Author</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((document) => (
                              <tr key={document.id} className="border-b">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(document.type)}
                                    <span className="font-medium">{document.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{document.type}</td>
                                <td className="px-4 py-3 text-sm">{document.size}</td>
                                <td className="px-4 py-3 text-sm">{document.modified}</td>
                                <td className="px-4 py-3 text-sm">{document.author}</td>
                                <td className="px-4 py-3">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        Actions
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>View</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Share</DropdownMenuItem>
                                      <DropdownMenuItem>Rename</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Templates</CardTitle>
                        <CardDescription>Reusable document templates</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search templates..." className="w-full sm:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Modified</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Author</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {templates.map((template) => (
                              <tr key={template.id} className="border-b">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(template.type)}
                                    <span className="font-medium">{template.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{template.type}</td>
                                <td className="px-4 py-3 text-sm">{template.size}</td>
                                <td className="px-4 py-3 text-sm">{template.modified}</td>
                                <td className="px-4 py-3 text-sm">{template.author}</td>
                                <td className="px-4 py-3">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        Actions
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Use Template</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Share</DropdownMenuItem>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Media Files</CardTitle>
                        <CardDescription>Videos, audio, and other media</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search media..." className="w-full sm:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Modified</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Author</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {media.map((item) => (
                              <tr key={item.id} className="border-b">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(item.type)}
                                    <span className="font-medium">{item.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{item.type}</td>
                                <td className="px-4 py-3 text-sm">{item.size}</td>
                                <td className="px-4 py-3 text-sm">{item.modified}</td>
                                <td className="px-4 py-3 text-sm">{item.author}</td>
                                <td className="px-4 py-3">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        Actions
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Play/Preview</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Share</DropdownMenuItem>
                                      <DropdownMenuItem>Properties</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
