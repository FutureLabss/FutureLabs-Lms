import { useParams, useSearchParams } from "next/navigation";
import ClassroomFeed from "@/components/classroom/ClassroomFeed";

const ClassroomFeedPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const classroomName = searchParams.get("classroomName") || "Classroom";

  return (
    <ClassroomFeed
      classroomId={id || ""}
      classroomName={classroomName}
    />
  );
};

export default ClassroomFeedPage;
