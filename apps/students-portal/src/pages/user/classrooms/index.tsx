import { ClassroomCard } from "@/shared/components/classroom-card";
import UserLayout, { layoutInterface } from "@/shared/layouts/userLayout";
import { useGetAllClassrooms } from "@/shared/hooks/query/classroom/getAllClassroom";
import { GetAllClassroom } from "@/core/types/interface/classroom.ts/getAllClassroom";
import { AlertCircle } from "lucide-react";


export default function ClassroomsPage() {
  const { data: classroomsData } = useGetAllClassrooms();
  console.log(classroomsData, "classroomsData");
  return (
    <div className="container mx-auto py-6">
     

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
