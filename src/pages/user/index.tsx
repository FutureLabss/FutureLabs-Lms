// import EmptyState from "@/shared/components/common/emptyState/empty";
import PreAppBar from "@/shared/components/layouts/appbar";
import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
import UserLayout from "@/shared/layouts/userLayout";
import { useState } from "react";

export default function DashboardPage() {
  // const [showDrawer, setShowDrawer] = useState(false);
  // const toggleDrawer = () => {
  //   setShowDrawer((val) => !val);
  // };
  return (
    <UserLayout title={""} description={""} >
     
      <UserDashboardAttendanceDetails />
      <UserDashboardStudentProgress />
      <UserDashboardPreRecordedClasses />
          {/* <EmptyState /> */}
    </UserLayout>
  );
}

