"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllRecordedCourses } from "@/hooks/query/recorded-course";
import { Course, RecordedCourseData } from "@/lib/types/recorded-courses";
import { Eye, Loader, Plus, Search, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CourseCardSkeleton from "./loading-course-skeleton";

// TypeScript interfaces for the API response

export default function CoursesPage() {
  const { data, loading: isLoading } = useGetAllRecordedCourses();
  const courses = data?.data || []; // Use the data from the query

  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <Button asChild>
          <Link href="/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            <CourseCardSkeleton />
          </div>
        ) : (
          ["all", "published", "draft"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses
                  .filter((course: Course) => {
                    console.log("Filtering course:", course);

                    const matchesTab =
                      tabValue === "all" || course?.status === tabValue;

                    // Then filter by search query
                    const matchesSearch =
                      searchQuery === "" ||
                      course.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      course.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                    return matchesTab && matchesSearch;
                  })
                  .map((course: Course) => (
                    <Card key={course.id}>
                      <CardHeader className="relative p-0">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                          {/* Use a div with background color instead of an image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground opacity-50" />
                          </div>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"></div>{" "}
                        </div>
                        <div className="p-6 pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="line-clamp-1">
                                {course.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2 mt-1">
                                {course.description}
                              </CardDescription>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs ${
                                course.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                              }`}
                            >
                              {course.status === "published"
                                ? "Published"
                                : "Draft"}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{course.modules_count} modules</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {course.students_count} students enrolled
                            </span>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/courses/${course.id}`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
}
