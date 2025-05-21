import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";
import CourseCardSkeleton from "@/app/(dashboard)/classes/[id]/loading";
import { useGetAllClassroomAssignments } from "@/hooks/query/classroom";

interface Iprops {
  classId: string;
}

export default function ViewAssignments({ classId }: Iprops) {
    const{data:retrivedAllAssignments,  loading,
    error,}=useGetAllClassroomAssignments(Number(classId), !!Number(classId))
     const assignments = retrivedAllAssignments?.data|| [];

  return (
    <div>
      {loading ? (
        <CourseCardSkeleton />
      ) : assignments.length === 0 ? (
        <div className="text-center text-muted-foreground py-6">u 
          No assignments found for this classroom.
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(assignment.due_date).toLocaleDateString()} • {assignment.points} points
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
      )}
    </div>
  );
}
