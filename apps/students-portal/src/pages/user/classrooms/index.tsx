import { ClassroomCard } from "@/shared/components/classroom-card";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useGetAllClassrooms } from "@/shared/hooks/query/classroom/getAllClassroom";
import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { AlertCircle } from "lucide-react";
// correction done

// Mock data for classrooms
// const classrooms = [
//   {
//     id: 8,
//     name: "Basic of Data Analytics",
//     description: "Learn the fundamentals of data analytics",
//     status: "active",
//     start_date: "2025-04-22",
//     end_date: "2025-04-23",
//     tutors: [
//       {
//         id: 4,
//         fullname: "Ukpono Titus",
//         email: "ukponoFL@gmail.com",
//       },
//     ],
//     schedules: {
//       days_of_week: ["Monday"],
//       start_time: "16:38:00",
//       end_time: "18:38:00",
//     },
//   },
//   {
//     id: 9,
//     name: "UX Design Fundamentals",
//     description: "Introduction to user experience design principles",
//     status: "active",
//     start_date: "2025-04-25",
//     end_date: "2025-05-25",
//     tutors: [
//       {
//         id: 5,
//         fullname: "Boss Tee",
//         email: "boss@example.com",
//       },
//     ],
//     schedules: {
//       days_of_week: ["Wednesday", "Friday"],
//       start_time: "13:30:00",
//       end_time: "15:30:00",
//     },
//   },
//   {
//     id: 10,
//     name: "Interaction Design",
//     description: "Advanced interaction design techniques",
//     status: "active",
//     start_date: "2025-05-01",
//     end_date: "2025-06-01",
//     tutors: [
//       {
//         id: 6,
//         fullname: "Emediong",
//         email: "emediong@example.com",
//       },
//     ],
//     schedules: {
//       days_of_week: ["Tuesday", "Thursday"],
//       start_time: "13:30:00",
//       end_time: "15:30:00",
//     },
//   },
// ];

export default function ClassroomsPage() {
  const { data: classroomsData } = useGetAllClassrooms();
  console.log(classroomsData, "classroomsData");
  return (
    <div className="container mx-auto py-6">
      {/* <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Classrooms</h1>
      </div> */}

      <section>
        {classroomsData?.data?.length ?? 0 > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classroomsData?.data?.map((classroom: GetAllClassroom) => (
              <ClassroomCard key={classroom.id} classroom={classroom} />
            ))}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-amber-50 rounded-lg p-6 flex flex-col items-center">
              <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-amber-700">
                No Class Found
              </h3>
              <p className="text-amber-600 mt-2">
                It looks like you haven&apos;t been assigned to a class yet.
                Please contact an administrator to help assign you to the
                appropriate class.
              </p>
            </div>

            <div className="space-y-4">
              {/* <Button
                            variant="outline"
                            size="lg"
                            className="w-full md:w-auto md:px-12"
                            asChild
                          >
                            <Link href="/support">Contact Administrator</Link>
                          </Button> */}

              <p className="text-sm text-gray-500">
                Please email support at{" "}
                <a
                  href="mailto:support@futurelabs.com"
                  className="text-orange-500 hover:underline"
                >
                  support@futurelabs.com
                </a>
              </p>
            </div>
          </div>
        )}
      </section>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classroomsData?.data?.map((classroom: GetAllClassroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div> */}
    </div>
  );
}

function Layout(props: layoutInterface) {
  return <UserLayout {...props} title="My Classrooms" description="" />;
}
ClassroomsPage.Layout = Layout;
