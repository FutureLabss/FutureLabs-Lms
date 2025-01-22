import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
import {useGetMeprofile } from "@/shared/hooks/query/users";
import UserLayout from "@/shared/layouts/userLayout";
import { useRouter } from "next/router";


export default function DashboardPage() {
  const router = useRouter()
  const userId = router.query.userId as string
  const { data: user } = useGetMeprofile()

  return (
    <UserLayout title={`Welcome ${user?.data.fullname || "user"}👋🏻`} description={""} userId={userId}>
      <UserDashboardAttendanceDetails />
      <UserDashboardStudentProgress />
      <UserDashboardPreRecordedClasses />
    </UserLayout>
  )
}
