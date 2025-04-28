import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "lucide-react";

export default function CourseCardSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <Card key={index}>
          <CardHeader className="relative p-0">
            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground opacity-50" />
              </div>
            </div>
            <div className="p-6 pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
