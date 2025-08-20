"use client";

import { useRouter } from "next/navigation";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useClassrooms } from "./classroom-provider";
import { ClassroomGridSkeleton } from "./classroom-grid-skeleton";

export function ClassroomGrid() {
  const { filteredClassrooms, isLoading } = useClassrooms();
  const router = useRouter();

  const handleManage = (id: string) => {
    // Simply navigate to the classroom detail page
    router.push(`/classrooms/${id}`);
  };

  const handleViewFeed = (id: string) => {
    // In a real app, this would navigate to the class feed
    console.log("View feed for classroom:", id);
  };

  if (isLoading) {
    return <ClassroomGridSkeleton />;
  }

  if (filteredClassrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium">No classrooms found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredClassrooms.map((classroom) => (
        <Card key={classroom.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{classroom.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {classroom.program}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{classroom.students.length} Students</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Started: {formatDate(classroom.startDate)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{classroom.learningMaterials} Learning Materials</span>
              </div>

              {classroom.nextClass && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Next Class: {classroom.nextClass}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Class Feed</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 p-6 pt-0">
            <Button
              className="w-full"
              onClick={() => handleManage(classroom.id)}
            >
              Manage Classroom
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleViewFeed(classroom.id)}
            >
              View Class Feed
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
