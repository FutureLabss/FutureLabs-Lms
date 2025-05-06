import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function CourseCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-40" /> {/* Course title */}
              <Skeleton className="h-3 w-20" /> {/* Category */}
            </div>
            <Skeleton className="h-6 w-14 rounded-full" /> {/* Status badge */}
          </div>

          {/* Date and student count */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-6" />
              {/* <Calendar className="w-4 h-4 text-muted-foreground" /> */}
              <Skeleton className="h-4 w-6" /> {/* 0 */}
            </div>
          </div>

          {/* View link */}
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" /> {/* X students */}
            <Skeleton className="h-4 w-12" /> {/* View */}
          </div>
        </Card>
      ))}
    </div>
  );
}
