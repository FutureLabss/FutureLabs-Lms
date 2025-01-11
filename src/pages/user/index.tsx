import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
import { useGetSingleUsersAcount } from "@/shared/hooks/query/users";
import UserLayout from "@/shared/layouts/userLayout";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { data: user } = useGetSingleUsersAcount(userId);
  const firstName = user?.data?.[0]?.first_name || "User";

  return (
    <UserLayout
      title={`Welcome ${firstName || "User"} 👋🏻`}
      description={""}
      userId={userId}>
      <UserDashboardAttendanceDetails />
      <UserDashboardStudentProgress />
      <UserDashboardPreRecordedClasses />
    </UserLayout>
  );
}



// import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
// import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
// import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
// import UserLayout from "@/shared/layouts/userLayout";

// export default function DashboardPage() {
//   return (
//     <UserLayout title={"Welcome manny 👋🏻"} description={""} >
     
//       <UserDashboardAttendanceDetails />
//       <UserDashboardStudentProgress />
//       <UserDashboardPreRecordedClasses />
//     </UserLayout>
//   );
// }

