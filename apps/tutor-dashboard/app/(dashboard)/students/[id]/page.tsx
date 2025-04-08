"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, Mail, MoreHorizontal, Trash, User } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for a specific student
const studentData = {
  id: "1",
  name: "Alice Johnson",
  email: "alice@example.com",
  avatar: "/placeholder.svg",
  enrollmentDate: "2023-09-01",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  guardianName: "Robert Johnson",
  guardianEmail: "robert@example.com",
  guardianPhone: "+1 (555) 987-6543",
  level: "Advanced",
  status: "active",
  lastActive: "2023-09-15T14:30:00Z",
  progress: 85,
  classes: [
    {
      id: "1",
      name: "Advanced Mathematics",
      schedule: "Mon, Wed, Fri - 2:00 PM to 3:30 PM",
      progress: 90,
      assignments: {
        completed: 8,
        total: 10,
        grade: 92,
      },
      attendance: {
        present: 12,
        absent: 1,
        late: 2,
        total: 15,
      },
    },
    {
      id: "2",
      name: "Introduction to Physics",
      schedule: "Tue, Thu - 1:00 PM to 2:30 PM",
      progress: 80,
      assignments: {
        completed: 6,
        total: 8,
        grade: 85,
      },
      attendance: {
        present: 9,
        absent: 0,
        late: 1,
        total: 10,
      },
    },
  ],
  notes: [
    {
      id: "1",
      date: "2023-09-10T10:30:00Z",
      author: "John Doe",
      content: "Alice is showing excellent progress in calculus. Consider moving her to the advanced group.",
    },
    {
      id: "2",
      date: "2023-09-05T14:15:00Z",
      author: "Jane Smith",
      content: "Had a discussion with Alice's guardian about her career goals. She's interested in engineering.",
    },
  ],
  paymentHistory: [
    {
      id: "1",
      date: "2023-09-01T09:00:00Z",
      amount: 250,
      status: "paid",
      method: "Credit Card",
      description: "September tuition",
    },
    {
      id: "2",
      date: "2023-08-01T09:00:00Z",
      amount: 250,
      status: "paid",
      method: "Credit Card",
      description: "August tuition",
    },
  ],
}

export default function StudentDetailsPage() {
  const params = useParams()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // In a real application, you would fetch the student data based on the ID
  const studentId = params.id as string

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Format date and time
  const formatDateTime = (dateString: string) => {
    return `${formatDate(dateString)} at ${formatTime(dateString)}`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{studentData.name}</h1>
          <p className="text-muted-foreground">{studentData.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/students/${studentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>Print Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Remove Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="space-y-4 md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Personal and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={studentData.avatar} alt={studentData.name} />
                    <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Badge
                    className={
                      studentData.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    }
                  >
                    {studentData.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex-1 grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      Personal Information
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p>{studentData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{studentData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{studentData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p>{studentData.address}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Guardian Information</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Guardian Name</p>
                        <p>{studentData.guardianName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Guardian Email</p>
                        <p>{studentData.guardianEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Guardian Phone</p>
                        <p>{studentData.guardianPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      Enrollment Details
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Enrollment Date</p>
                        <p>{formatDate(studentData.enrollmentDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Level</p>
                        <p>{studentData.level}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      Activity
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Active</p>
                        <p>{formatDateTime(studentData.lastActive)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Overall Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={studentData.progress} className="h-2" />
                          <span className="text-sm">{studentData.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="classes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="classes">Enrolled Classes</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>

            <TabsContent value="classes" className="space-y-4">
              {studentData.classes.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <CardTitle>{cls.name}</CardTitle>
                    <CardDescription>{cls.schedule}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Progress</h3>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold">{cls.progress}%</div>
                          <Progress value={cls.progress} className="w-full mt-2" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Assignments</h3>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold">{cls.assignments.grade}%</div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {cls.assignments.completed} of {cls.assignments.total} completed
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Attendance</h3>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold">
                            {Math.round((cls.attendance.present / cls.attendance.total) * 100)}%
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {cls.attendance.present} present, {cls.attendance.absent} absent, {cls.attendance.late} late
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/classes/${cls.id}`}>View Class</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="flex justify-end">
                <Button>Add Note</Button>
              </div>

              {studentData.notes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{note.author}</p>
                        <p className="text-sm text-muted-foreground">{formatDateTime(note.date)}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Note</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mt-2">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Recent payments and invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${payment.amount}</p>
                            <p className="text-sm text-muted-foreground">{payment.method}</p>
                          </div>
                          <Badge
                            className={
                              payment.status === "paid"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                            }
                          >
                            {payment.status === "paid" ? "Paid" : "Pending"}
                          </Badge>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href={`/students/${studentId}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">{studentData.progress}%</span>
                  </div>
                  <Progress value={studentData.progress} className="w-full" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Class Performance</h3>
                  {studentData.classes.map((cls) => (
                    <div key={cls.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{cls.name}</span>
                        <span className="text-sm">{cls.progress}%</span>
                      </div>
                      <Progress value={cls.progress} className="w-full h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Student Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this student? This action cannot be undone.
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
                // In a real application, you would delete the student and redirect
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Remove Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
