import React from "react";
import { useParams } from "next/navigation";
import TopicViewer from "@/components/student/classroom/TopicViewer";

const StudentTopicViewerPage = () => {
  const params = useParams();
  const classroomId = params.classroomId as string;
  const topicId = params.topicId as string;
  
  if (!classroomId || !topicId) {
    return <div>Invalid classroom or topic ID</div>;
  }
  
  return <TopicViewer classroomId={classroomId} topicId={topicId} />;
};

export default StudentTopicViewerPage;
