import {
  ClassroomAllAssignmentResponse,
  ClassroomAllMaterialResponse,
  SingleModuleTopicResponse,
  TopicsListResponse,
} from "@/core/types/interface/classroom.ts/moduleTopics";
import { toast } from "@/shared/components/ui/use-toast";
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
    toast({
      title: "Error",
      description: `An error occurred while fetching module topic." + ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    console.error("Error fetching module topic:", error);
    // throw error; // Ensure the function always returns or throws
    return Promise.reject(error);
  }
};

export const getAllModuleTopics = async ({
  classroomId,
  moduleId,
}: {
  classroomId: number;
  moduleId: number;
}): Promise<TopicsListResponse> => {
  try {
    const response = await axios.get<TopicsListResponse>(
      `classrooms/${classroomId}/modules/${moduleId}/topics`
    );
    return response?.data;
  } catch (error) {
    toast({
      title: "Error",
      description: `An error occurred while fetching module topics." + ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    console.error("Error fetching module topics:", error);
    // throw error; // Ensure the function always returns or throws
    return Promise.reject(error);
  }
};

export const getAllClassroomMaterials = async ({
  classroomId,
}: {
  classroomId: number;
}): Promise<ClassroomAllMaterialResponse> => {
  try {
    const response = await axios.get<ClassroomAllMaterialResponse>(
      `classrooms/${classroomId}/resources?query=materials`
    );
    return response?.data;
  } catch (error) {
    toast({
      title: "Error",
      description: `An error occurred while fetching module materials." + ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    console.error("Error fetching module materials:", error);
    // throw error; // Ensure the function always returns or throws
    return Promise.reject(error);
  }
};

export const getAllClassroomAssignments = async ({
  classroomId,
}: {
  classroomId: number;
}): Promise<ClassroomAllAssignmentResponse> => {
  try {
    const response = await axios.get<ClassroomAllAssignmentResponse>(
      `student/classrooms/${classroomId}/assignment?query=all`
    );
    return response?.data;
  } catch (error) {
    toast({
      title: "Error",
      description: `An error occurred while fetching module assignments." + ${
        error instanceof Error ? error.message : ""
      }`,
      variant: "destructive",
    });
    // console.error("Error fetching module assignments:", error);
    // throw error;
    //  Ensure the function always returns or throws
    return Promise.reject(error);
  }
};
