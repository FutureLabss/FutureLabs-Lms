"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, MoreHorizontal, Plus, Trash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddStudentModal } from "@/components/add-student-modal"
import { StudentProgressModal } from "@/components/student-progress-modal"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
// Import the AddMaterialModal component
import { AddMaterialModal } from "@/components/add-material-modal"

// Mock data for a specific class
const initialClassData = {
  id: "1",
  name: "Advanced Mathematics",
  description:
    "A comprehensive course covering advanced mathematical concepts including calculus, algebra, and geometry. Students will learn problem-solving techniques and applications in real-world scenarios.",
  program: "High School",
  maxStudents: 20,
  currentStudents: 15,
  startDate: "2023-09-01",
  endDate: "2023-12-15",
  schedule: {
    daysOfWeek: ["Monday", "Wednesday", "Friday"],
    startTime: "14:00",
    endTime: "15:30",
  },
  status: "active",
  tutorId: "1",
  students: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "/placeholder.svg",
      enrollmentDate: "2023-09-01",
    },
    { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "/placeholder.svg", enrollmentDate: "2023-09-02" },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "/placeholder.svg",
      enrollmentDate: "2023-09-03",
    },
  ],
  materials: [
    { id: "1", title: "Calculus Fundamentals", type: "pdf", url: "#", createdAt: "2023-09-05" },
    { id: "2", title: "Algebra Practice Problems", type: "pdf", url: "#", createdAt: "2023-09-10" },
    { id: "3", title: "Geometry Formulas", type: "document", url: "#", createdAt: "2023-09-15" },
  ],
  assignments: [
    { id: "1", title: "Calculus Quiz 1", dueDate: "2023-09-15", points: 20, submissions: [] },
    { id: "2", title: "Algebra Homework", dueDate: "2023-09-20", points: 15, submissions: [] },
    { id: "3", title: "Geometry Project", dueDate: "2023-10-01", points: 30, submissions: [] },
  ],
}

export default function ClassDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [classData, setClassData] = useState(initialClassData)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false)
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState<string | null>(null)
  const [isRemoveStudentDialogOpen, setIsRemoveStudentDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  // In a real application, you would fetch the class data based on the ID
  const classId = params.id as string

  const handleAddStudent = (student: any) => {
    // Check if student is already in the class
    const isStudentAlreadyEnrolled = classData.students.some((s) => s.id === student.id)

    if (isStudentAlreadyEnrolled) {
      toast({
        title: "Student already enrolled",
        description: `${student.name} is already enrolled in this class.`,
        variant: "destructive",
      })
      return
    }

    // Check if class is at maximum capacity
    if (classData.students.length >= classData.maxStudents) {
      toast({
        title: "Class is full",
        description: `This class has reached its maximum capacity of ${classData.maxStudents} students.`,
        variant: "destructive",
      })
      return
    }

    // Add student to the class
    const updatedClassData = {
      ...classData,
      students: [...classData.students, student],
      currentStudents: classData.currentStudents + 1,
    }

    setClassData(updatedClassData)

    toast({
      title: "Student added",
      description: `${student.name} has been added to ${classData.name}.`,
    })
  }

  const handleRemoveStudent = (studentId: string) => {
    setStudentToRemove(studentId)
    setIsRemoveStudentDialogOpen(true)
  }

  const confirmRemoveStudent = () => {
    if (!studentToRemove) return

    const studentToRemoveData = classData.students.find((s) => s.id === studentToRemove)
    const updatedStudents = classData.students.filter((s) => s.id !== studentToRemove)

    const updatedClassData = {
      ...classData,
      students: updatedStudents,
      currentStudents: classData.currentStudents - 1,
    }

    setClassData(updatedClassData)
    setIsRemoveStudentDialogOpen(false)
    setStudentToRemove(null)

    toast({
      title: "Student removed",
      description: `${studentToRemoveData?.name} has been removed from ${classData.name}.`,
      action: (
        <ToastAction altText="Undo" onClick={() => handleAddStudent(studentToRemoveData)}>
          Undo
        </ToastAction>
      ),
    })
  }

  const handleViewProgress = (student: any) => {
    setSelectedStudent(student)
    setIsProgressModalOpen(true)
  }

  // Update the handleAddMaterial function in the ClassDetailsPage component
  const handleAddMaterial = (material: any) => {
    // Add material to the class
    const updatedClassData = {
      ...classData,
      materials: [...classData.materials, material],
    }

    setClassData(updatedClassData)

    toast({
      title: "Material added",
      description: `${material.title} has been added to ${classData.name}.`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/classes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{classData.name}</h1>
          <p className="text-muted-foreground">{classData.program}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/classes/${classId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Class
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate Class</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="space-y-4 md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
              <CardDescription>View and manage class information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">{classData.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      Schedule
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{classData.schedule.daysOfWeek.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      Time
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {classData.schedule.startTime} - {classData.schedule.endTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      Students
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {classData.currentStudents} / {classData.maxStudents}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(classData.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">End Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(classData.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="students" className="space-y-4">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Students</h2>
                  <p className="text-sm text-muted-foreground">
                    {classData.students.length} of {classData.maxStudents} students enrolled
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddStudentDialogOpen(true)}
                  disabled={classData.students.length >= classData.maxStudents}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>

              {classData.students.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No students enrolled</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This class doesn't have any students yet. Add students to get started.
                    </p>
                    <Button onClick={() => setIsAddStudentDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {classData.students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="ml-2">
                              Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => handleViewProgress(student)}>
                              View Progress
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewProgress(student)}>
                                  View Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleRemoveStudent(student.id)}
                                >
                                  Remove from Class
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Materials</h2>
                <Button onClick={() => setIsAddMaterialDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Material
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {classData.materials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.type.toUpperCase()} • Added on {new Date(material.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
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
                              <DropdownMenuItem>Download</DropdownMenuItem>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Assignments</h2>
                <Button onClick={() => setIsAddAssignmentDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Assignment
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {classData.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()} • {assignment.points} points
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assignments/${assignment.id}`}>View</Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Grade</DropdownMenuItem>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Class Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-sm">
                    {classData.currentStudents} / {classData.maxStudents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Materials</span>
                  <span className="text-sm">{classData.materials.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assignments</span>
                  <span className="text-sm">{classData.assignments.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                      <span className="text-xs font-medium">SEP</span>
                      <span className="text-lg font-bold">{i + 10}</span>
                    </div>
                    <div>
                      <p className="font-medium">Session {i}</p>
                      <p className="text-xs text-muted-foreground">
                        {classData.schedule.startTime} - {classData.schedule.endTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Class Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this class? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                router.push("/classes")
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Modal */}
      <AddStudentModal
        open={isAddStudentDialogOpen}
        onOpenChange={setIsAddStudentDialogOpen}
        onStudentAdded={handleAddStudent}
        classId={classId}
      />

      {/* Remove Student Dialog */}
      <Dialog open={isRemoveStudentDialogOpen} onOpenChange={setIsRemoveStudentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this student from the class? They will lose access to all class materials
              and assignments.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRemoveStudentDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemoveStudent}>
              <Trash className="mr-2 h-4 w-4" />
              Remove Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Student Progress Modal */}
      {selectedStudent && (
        <StudentProgressModal
          open={isProgressModalOpen}
          onOpenChange={setIsProgressModalOpen}
          student={selectedStudent}
          classData={classData}
        />
      )}
      {/* Add Material Modal */}
      <AddMaterialModal
        open={isAddMaterialDialogOpen}
        onOpenChange={setIsAddMaterialDialogOpen}
        onMaterialAdded={handleAddMaterial}
        classId={classId}
      />
    </div>
  )
}
