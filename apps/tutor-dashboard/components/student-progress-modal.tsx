"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

type StudentProgressModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: any
  classData: any
}

export function StudentProgressModal({ open, onOpenChange, student, classData }: StudentProgressModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for student progress
  const progressData = {
    overview: {
      attendance: 85, // percentage
      assignmentsCompleted: 8,
      totalAssignments: 10,
      averageGrade: 87, // percentage
      lastActive: "2023-09-15T14:30:00Z",
    },
    assignments: [
      {
        id: "1",
        title: "Calculus Quiz 1",
        dueDate: "2023-09-15",
        status: "completed",
        grade: 92,
        submittedOn: "2023-09-14T10:15:00Z",
        feedback: "Excellent work on derivatives!",
      },
      {
        id: "2",
        title: "Algebra Homework",
        dueDate: "2023-09-20",
        status: "completed",
        grade: 85,
        submittedOn: "2023-09-19T16:45:00Z",
        feedback: "Good effort, but watch out for sign errors.",
      },
      {
        id: "3",
        title: "Geometry Project",
        dueDate: "2023-10-01",
        status: "in-progress",
        grade: null,
        submittedOn: null,
        feedback: null,
      },
      {
        id: "4",
        title: "Trigonometry Quiz",
        dueDate: "2023-09-10",
        status: "late",
        grade: 75,
        submittedOn: "2023-09-12T09:30:00Z",
        feedback: "Late submission, but decent understanding of concepts.",
      },
    ],
    attendance: [
      { date: "2023-09-01", status: "present" },
      { date: "2023-09-03", status: "present" },
      { date: "2023-09-05", status: "absent" },
      { date: "2023-09-08", status: "present" },
      { date: "2023-09-10", status: "present" },
      { date: "2023-09-12", status: "late" },
      { date: "2023-09-15", status: "present" },
    ],
    materials: [
      {
        id: "1",
        title: "Calculus Fundamentals",
        type: "pdf",
        accessed: true,
        lastAccessed: "2023-09-10T11:20:00Z",
        timeSpent: 45, // minutes
      },
      {
        id: "2",
        title: "Algebra Practice Problems",
        type: "pdf",
        accessed: true,
        lastAccessed: "2023-09-14T15:10:00Z",
        timeSpent: 30,
      },
      {
        id: "3",
        title: "Geometry Formulas",
        type: "document",
        accessed: false,
        lastAccessed: null,
        timeSpent: 0,
      },
    ],
  }

  // Calculate completion percentage for assignments
  const assignmentCompletionPercentage =
    (progressData.assignments.filter((a) => a.status === "completed").length / progressData.assignments.length) * 100

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
    if (!dateString) return "N/A"
    return `${formatDate(dateString)} at ${formatTime(dateString)}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Student Progress</DialogTitle>
          <DialogDescription>
            Viewing progress for {student.name} in {classData.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student?.name ? student.name.charAt(0) : "?"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">Enrolled: {formatDate(student.enrollmentDate)}</Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>Overall attendance rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">{progressData.overview.attendance}%</div>
                    <Progress value={progressData.overview.attendance} className="w-full mt-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {progressData.attendance.filter((a) => a.status === "present").length} of{" "}
                      {progressData.attendance.length} sessions attended
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Assignment completion rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">
                      {progressData.overview.assignmentsCompleted}/{progressData.overview.totalAssignments}
                    </div>
                    <Progress value={assignmentCompletionPercentage} className="w-full mt-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {progressData.overview.assignmentsCompleted} of {progressData.overview.totalAssignments}{" "}
                      assignments completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance</CardTitle>
                <CardDescription>Overall grade and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <div className="text-4xl font-bold">{progressData.overview.averageGrade}%</div>
                    <p className="text-sm text-muted-foreground mt-2">Average Grade</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <div className="text-sm font-medium">Last Active</div>
                    <div className="text-lg font-semibold mt-1">{formatDate(progressData.overview.lastActive)}</div>
                    <p className="text-sm text-muted-foreground mt-1">{formatTime(progressData.overview.lastActive)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Progress</CardTitle>
                <CardDescription>
                  Completed {progressData.overview.assignmentsCompleted} of {progressData.overview.totalAssignments}{" "}
                  assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">Due: {formatDate(assignment.dueDate)}</p>
                        </div>
                        <div>
                          {assignment.status === "completed" && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </Badge>
                          )}
                          {assignment.status === "in-progress" && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              In Progress
                            </Badge>
                          )}
                          {assignment.status === "late" && (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                              Late
                            </Badge>
                          )}
                        </div>
                      </div>
                      {(assignment.status === "completed" || assignment.status === "late") && (
                        <div className="mt-3 grid gap-2 md:grid-cols-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Grade</p>
                            <p className="font-medium">{assignment.grade}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Submitted</p>
                            <p className="font-medium">{formatDateTime(assignment.submittedOn || "")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Feedback</p>
                            <p className="font-medium line-clamp-1">{assignment.feedback || "No feedback yet"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>
                  Attended {progressData.attendance.filter((a) => a.status === "present").length} of{" "}
                  {progressData.attendance.length} sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {progressData.attendance.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        {session.status === "present" && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                        )}
                        {session.status === "absent" && <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />}
                        {session.status === "late" && <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />}
                        <div>
                          <p className="font-medium">Session {index + 1}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(session.date)}</p>
                        </div>
                      </div>
                      <div>
                        {session.status === "present" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Present
                          </Badge>
                        )}
                        {session.status === "absent" && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Absent</Badge>
                        )}
                        {session.status === "late" && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                            Late
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Materials</CardTitle>
                <CardDescription>
                  Accessed {progressData.materials.filter((m) => m.accessed).length} of {progressData.materials.length}{" "}
                  materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.materials.map((material) => (
                    <div key={material.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{material.title}</h3>
                          <p className="text-sm text-muted-foreground">{material.type.toUpperCase()}</p>
                        </div>
                        <div>
                          {material.accessed ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Accessed
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                              Not Accessed
                            </Badge>
                          )}
                        </div>
                      </div>
                      {material.accessed && (
                        <div className="mt-3 grid gap-2 md:grid-cols-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Last Accessed</p>
                            <p className="font-medium">{formatDateTime(material.lastAccessed || "")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Time Spent</p>
                            <p className="font-medium">
                              {material.timeSpent} {material.timeSpent === 1 ? "minute" : "minutes"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
