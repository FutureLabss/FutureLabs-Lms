import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import CourseCardSkeleton from "@/app/(dashboard)/classes/[id]/loading";
import { useGetAllClassroomAssignments } from "@/hooks/query/classroom";
import Link from "next/link";
import { ViewSubmittedAssignmentsModal } from "./ViewSubmittedAssignmentsModal";

interface Iprops {
  classId: string;
}

interface Assignment {
  id: string;
  title: string;
  due_date: string;
  points: number;
}

export default function ViewAssignments({ classId }: Iprops) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  const {
    data: retrivedAllAssignments,
    isLoading,
    error,
  } = useGetAllClassroomAssignments(classId, !!classId, "all");

  const assignments = retrivedAllAssignments?.data ?? [];

  const handleViewSubmissions = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setOpenModal(true);
  };

  return (
    <div>
      {isLoading ? (
        <CourseCardSkeleton />
      ) : error ? (
        <div className="text-center text-destructive py-6">
          Error loading assignments
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center text-muted-foreground py-6">
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
                    {/* <Button variant="outline" size="sm" asChild>
                      <Link href={`/assignments/${assignment.id}`}>View</Link>
                    </Button> */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewSubmissions(assignment.id)}
                    >
                      View Submissions
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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

      {selectedAssignmentId && (
        <ViewSubmittedAssignmentsModal
          open={openModal}
          onOpenChange={setOpenModal}
          assignmentId={selectedAssignmentId}
          classId={classId}
        />
      )}
    </div>
  );
}