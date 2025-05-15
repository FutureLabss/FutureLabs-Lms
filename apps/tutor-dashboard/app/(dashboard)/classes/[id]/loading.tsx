import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Users } from "lucide-react";

export default function CourseCardSkeleton() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" /> {/* Title */}
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-1/4" /> {/* Subtitle */}

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 space-y-2">
              {/* <Calendar className="w-4 h-4 text-muted-foreground" /> */}
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2 space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="space-y-2 col-span-1">
            <div className="flex items-center gap-2">
              {/* <Users className="w-4 h-4 text-muted-foreground" /> */}
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex-col space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex-col space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
