"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Mail, Eye, UserPlus, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for students
const initialStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-09-01",
    classes: ["Advanced Mathematics", "Introduction to Physics"],
    level: "Advanced",
    status: "active",
    lastActive: "2023-09-15T14:30:00Z",
    progress: 85,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-09-02",
    classes: ["Advanced Mathematics", "Chemistry Fundamentals"],
    level: "Intermediate",
    status: "active",
    lastActive: "2023-09-14T10:15:00Z",
    progress: 72,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-09-03",
    classes: ["Introduction to Physics"],
    level: "Beginner",
    status: "active",
    lastActive: "2023-09-13T16:45:00Z",
    progress: 65,
  },
  {
    id: "4",
    name: "Diana Miller",
    email: "diana@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-08-15",
    classes: ["Chemistry Fundamentals", "Biology 101"],
    level: "Advanced",
    status: "inactive",
    lastActive: "2023-09-01T09:30:00Z",
    progress: 90,
  },
  {
    id: "5",
    name: "Edward Wilson",
    email: "edward@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-08-20",
    classes: ["English Literature"],
    level: "Intermediate",
    status: "active",
    lastActive: "2023-09-12T11:20:00Z",
    progress: 78,
  },
  {
    id: "6",
    name: "Fiona Garcia",
    email: "fiona@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-08-25",
    classes: ["Advanced Mathematics", "English Literature"],
    level: "Beginner",
    status: "active",
    lastActive: "2023-09-11T15:10:00Z",
    progress: 60,
  },
  {
    id: "7",
    name: "George Taylor",
    email: "george@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-07-10",
    classes: ["Biology 101"],
    level: "Advanced",
    status: "inactive",
    lastActive: "2023-08-30T13:45:00Z",
    progress: 95,
  },
  {
    id: "8",
    name: "Hannah Lee",
    email: "hannah@example.com",
    avatar: "/placeholder.svg",
    enrollmentDate: "2023-07-15",
    classes: ["Introduction to Physics", "Chemistry Fundamentals"],
    level: "Intermediate",
    status: "active",
    lastActive: "2023-09-10T09:15:00Z",
    progress: 82,
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.classes.some((cls) => cls.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLevel = levelFilter === "all" || student.level.toLowerCase() === levelFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesLevel && matchesStatus
  })

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate days since last active
  const getDaysSinceLastActive = (lastActiveDate: string) => {
    const lastActive = new Date(lastActiveDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastActive.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <Button asChild>
          <Link href="/students/add">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students by name, email, or class..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "table")}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-2">
        {viewMode === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }
                      >
                        {student.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/students/${student.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Level</span>
                      <span className="text-sm">{student.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enrolled</span>
                      <span className="text-sm">{formatDate(student.enrollmentDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Active</span>
                      <span className="text-sm">{getDaysSinceLastActive(student.lastActive)} days ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{student.progress}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Enrolled Classes</h4>
                    <div className="flex flex-wrap gap-2">
                      {student.classes.map((cls, index) => (
                        <Badge key={index} variant="outline">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/students/${student.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrolled Classes</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }
                      >
                        {student.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.classes.map((cls, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
                    <TableCell>{getDaysSinceLastActive(student.lastActive)} days ago</TableCell>
                    <TableCell>{student.progress}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/students/${student.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/students/${student.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Remove Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
            <p className="text-muted-foreground mb-4">No students found matching your filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setLevelFilter("all")
                setStatusFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
