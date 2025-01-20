import { courses } from "@/core/const/userdashboard/courses/courses";
import CourseCard from "@/shared/components/userDashboard/courses/courses";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";

export default function UserCoursesPage() {
  return (
    <div className=" w-full min-h-screen py-8">
      <div className=" px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[30px]">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  )
}
function Layout(props: layoutInterface) {
  return (
    <UserLayout
      {...props}
      title="Pre recorded courses for you"
      description=""
    />
  );
}
UserCoursesPage.Layout = Layout;