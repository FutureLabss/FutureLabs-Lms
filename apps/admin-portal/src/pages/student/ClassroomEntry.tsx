import React from "react";
import { useParams } from "next/navigation";
import ClassroomEntry from "@/components/student/classroom/ClassroomEntry";

const StudentClassroomEntryPage = () => {
  const params = useParams();
  const id = params.id as string;
  
  if (!id) {
    return <div>Invalid classroom ID</div>;
  }
  
  return <ClassroomEntry classroomId={id} />;
};

export default StudentClassroomEntryPage;
