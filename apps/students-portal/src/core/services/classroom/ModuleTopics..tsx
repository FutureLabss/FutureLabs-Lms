import { SingleModuleTopicResponse } from "@/core/types/interface/classroom.ts/moduleTopics";
import axios from "axios";

export const getSingleModuleTopic = async ({
  topicId,
  classroomId,
  moduleId,
}: {
  topicId: number;
  classroomId: number;
  moduleId: number;
}): Promise<SingleModuleTopicResponse> => {
  try {
    const response = await axios.get<SingleModuleTopicResponse>(
      `classrooms/${classroomId}/modules/${moduleId}/topics/${topicId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching module topics:", error);
    throw error;
  }
};
