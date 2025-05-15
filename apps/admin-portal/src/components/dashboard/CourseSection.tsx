import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const router = useRouter();
  const { toast } = useToast();
  
  const handleViewAllCourses = () => {
    console.log("Navigating to All Courses");
    router.push("/courses");
  };

  const handleManageCourse = () => {
    console.log("Managing course");
    // Update to navigate to courses page and set the tab to 'manage'
    router.push("/courses?tab=manage&course=course1");
  };

  const handleViewCourse = () => {
    console.log("Viewing course");
    router.push("/courses");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Pre-Recorded Courses</h2>
        <button 
          className="text-sm text-primary font-medium hover:underline"
          onClick={handleViewAllCourses}
        >
          View All Courses
        </button>
      </div>
      
      <CourseCard
        title="UI/UX Design Fundamentals"
        program="UI/UX Design"
        branch="N/A"
        students={42}
        modules={5}
        views={320}
        mostWatchedTitle="Introduction to UI/UX Principles"
        mostWatchedViews={85}
        onManage={handleManageCourse}
        onView={handleViewCourse}
      />
    </div>
  );
};

export default CourseSection;

