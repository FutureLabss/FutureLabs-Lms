import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseDetailsSkeletonLoader() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex-1">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="space-y-4 md:col-span-5">
          {/* Course details card skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Tabs skeleton */}
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">
                <Skeleton className="h-4 w-28" />
              </TabsTrigger>
              <TabsTrigger value="students">
                <Skeleton className="h-4 w-20" />
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Skeleton className="h-4 w-20" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>

              {/* Module skeletons */}
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: 2 }).map((_, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between p-2 bg-muted rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-4" />
                              <div>
                                <Skeleton className="h-4 w-40 mb-1" />
                                <Skeleton className="h-3 w-20" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-8 w-20" />
                              <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-28" />
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: 1 }).map((_, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between p-2 bg-muted rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-4" />
                              <div>
                                <Skeleton className="h-4 w-40 mb-1" />
                                <Skeleton className="h-3 w-32" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-8 w-16" />
                              <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4 md:col-span-2">
          {/* Course status card skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student progress card skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
