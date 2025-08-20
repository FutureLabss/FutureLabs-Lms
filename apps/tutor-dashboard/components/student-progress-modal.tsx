"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { useGetSingleStudentProgress } from "@/hooks/query/classroom"

type StudentProgressModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: any
  classData: any
  classroomId:string
  studentId:string
}

export function StudentProgressModal({ open, onOpenChange, student, classData, classroomId, studentId }: StudentProgressModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const {data: progressData}=useGetSingleStudentProgress(classroomId, studentId)
      console.log(progressData, "singleprogress");
    console.log(classroomId, "id");
    console.log(studentId, "id");

  // Calculate completion percentage for assignments
  const assignmentCompletionPercentage =
  progressData?.data.totalAssignments && progressData?.data.submittedAssignments
    ? (progressData.data.submittedAssignments / progressData.data.totalAssignments) * 100
    : 0;
// format date
const parseCustomDate = (dateString?: string): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split(" ");
  if (parts.length < 4) return null;

  const [day, month, year, time, meridian] = [
    parts[0],
    parts[1],
    parts[2],
    parts[3],
    parts[4],
  ];

  const formatted = `${day} ${month} ${year} ${time} ${meridian}`;
  return new Date(formatted);
};

const formatDate = (dateString?: string) => {
  const date = parseCustomDate(dateString);
  if (!date || isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString?: string) => {
  const date = parseCustomDate(dateString);
  if (!date || isNaN(date.getTime())) return "N/A";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};


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
                    <div className="text-4xl font-bold">{progressData?.data.attendedClasses}%</div>
                    <Progress value={progressData?.data.attendedClasses} className="w-full mt-2" />
                    {/* <p className="text-sm text-muted-foreground mt-2">
                      {progressData.attendance.filter((a) => a.status === "present").length} of{" "}
                      {progressData.attendance.length} sessions attended
                    </p> */}
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
      {progressData?.data.submittedAssignments}/{progressData?.data.totalAssignments}
    </div>
    <Progress value={assignmentCompletionPercentage} className="w-full mt-2" />
    <p className="text-sm text-muted-foreground mt-2">
      {progressData?.data.submittedAssignments} of {progressData?.data.totalAssignments} assignments completed
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
                    <div className="text-4xl font-bold">{progressData?.data.overallProgress}%</div>
                    <p className="text-sm text-muted-foreground mt-2">Average Grade</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <div className="text-sm font-medium">Last Active</div>
                    <div className="text-lg font-semibold mt-1">{formatDate(progressData?.data?.lastActive)}</div>
                    <p className="text-sm text-muted-foreground mt-1">{formatTime(progressData?.data?.lastActive)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4 mt-4">
            {/* <Card>
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
            </Card> */}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4 mt-4">
            {/* <Card>
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
            </Card> */}
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 mt-4">
            {/* <Card>
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
            </Card> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
