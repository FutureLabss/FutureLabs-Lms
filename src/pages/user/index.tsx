import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
import UserLayout from "@/shared/layouts/userLayout";

export default function DashboardPage() {
  return (
    <UserLayout title={"Welcome manny 👋🏻"} description={""} >
     
      <UserDashboardAttendanceDetails />
      <UserDashboardStudentProgress />
      <UserDashboardPreRecordedClasses />
    </UserLayout>
  );
}

