import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const students = [
  {
    id: 1,
    name: "Emily Johnson",
    rank: "#1",
    courseProgress: "92%",
    assignments: 15,
    attendance: "98%",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    rank: "#2",
    courseProgress: "89%",
    assignments: 14,
    attendance: "95%",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
  {
    id: 3,
    name: "Sara Williams",
    rank: "#3",
    courseProgress: "86%",
    assignments: 13,
    attendance: "92%",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
  },
]

export function TopPerformingStudents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Performing Students</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>{student.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">Rank {student.rank}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{student.courseProgress}</span>
                  <span className="text-xs text-muted-foreground">Course</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{student.assignments}</span>
                  <span className="text-xs text-muted-foreground">Assignments</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{student.attendance}</span>
                  <span className="text-xs text-muted-foreground">Attendance</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
