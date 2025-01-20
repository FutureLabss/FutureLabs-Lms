import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
// import { useAuthContext } from "@/shared/context/auth";
// import { useGetAllUsers, useGetMeprofile } from "@/shared/hooks/query/users";
import UserLayout from "@/shared/layouts/userLayout";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const userId = router.query.userId as string;
  // console.log(auth?.data.id, "profileId", {meProfile})
  // const {data:users}=useGetAllUsers()
  // console.log(users, "users list")
  // const {data: me}=useGetMeprofile()
  // console.log({me}, "this is me")

  return (
    <UserLayout
      title={`Welcome user👋🏻`}
      description={""}
      userId={userId}
    >
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

