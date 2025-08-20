// import { getMeUserProfile } from "@/core/services/user";
import UserDashboardAttendanceDetails from "@/shared/components/userDashboard/attendancedetails";
import UserDashboardPreRecordedClasses from "@/shared/components/userDashboard/studentprerecordedclasses";
import UserDashboardStudentProgress from "@/shared/components/userDashboard/studentprogress";
// import { useGetMeprofile } from "@/shared/hooks/query/users";

import UserLayout from "@/shared/layouts/userLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [fullname, setFullname] = useState<string | undefined>();
  const router = useRouter();
  const userId = router.query.userId as string;

  // const { data: user } = useGetMeprofile();
  useEffect(() => {
    const studentProfile = localStorage.getItem("studentProfile");
    setFullname(
      studentProfile ? JSON.parse(studentProfile).fullname : undefined
    );
  }, []);

  return (
    <UserLayout
      title={`Welcome ${fullname || "user"}👋🏻`}
      description={""}
      userId={userId}
    >
      <UserDashboardAttendanceDetails />
      <UserDashboardStudentProgress />
      <UserDashboardPreRecordedClasses />
    </UserLayout>
  );
}
