import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface ClassroomCardProps {
  classroom: {
    id: number;
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
    tutors: {
      id: number;
      fullname: string;
      email: string;
    }[];
    schedules: {
      days_of_week: string[];
      start_time: string;
      end_time: string;
    };
  };
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  // Format time to be more readable
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format date to be more readable
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{classroom.name}</CardTitle>
            <CardDescription className="mt-1">
              {classroom.description}
            </CardDescription>
          </div>
          <Badge
            className={`badge ${
              classroom.status === "active"
                ? "badge-default"
                : "badge-secondary"
            }`}
          >
            {classroom.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Tutor:</span>
            <span className="ml-1 font-medium">
              {classroom.tutors[0]?.fullname}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Period:</span>
            <span className="ml-1 font-medium">
              {formatDate(classroom.start_date)} -{" "}
              {formatDate(classroom.end_date)}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Schedule:</span>
            <span className="ml-1 font-medium">
              {classroom.schedules.days_of_week.join(", ")} •{" "}
              {formatTime(classroom.schedules.start_time)} -{" "}
              {formatTime(classroom.schedules.end_time)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-slate-50 px-6 py-3">
        <Button asChild className="w-full">
          <Link href={`/classrooms/${classroom.id}`}>View Classroom</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
