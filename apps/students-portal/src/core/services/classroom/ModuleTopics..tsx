import { NotificationType } from "@/core/types/enum/notification";
import {
  ClassroomAllAssignmentResponse,
  ClassroomAllMaterialResponse,
  SingleAssignmentResponse,
  SingleModuleTopicResponse,
  TopicsListResponse,
} from "@/core/types/interface/classroom.ts/moduleTopics";
import useNotificationStore from "@/stores/notificationState";
import axios, { AxiosError, AxiosResponse } from "axios";

const setNotification = useNotificationStore.getState().displayNotification;

export async function getSingleModuleTopic({
  topicId,
  classroomId,
  moduleId,
}: {
  topicId: number;
  classroomId: number;
  moduleId: number;
}): Promise<SingleModuleTopicResponse> {
  return axios
    .get<SingleModuleTopicResponse>(
      `classrooms/${classroomId}/modules/${moduleId}/topics/${topicId}`
    )
    .then((res: AxiosResponse<SingleModuleTopicResponse>) => res.data)
    .catch((error) => {
      if (error instanceof Error) {
        const errorMessage = error?.message || "Failed to fetch module topic.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}

export async function getAllModuleTopics({
  classroomId,
  moduleId,
}: {
  classroomId: number;
  moduleId: number;
}): Promise<TopicsListResponse> {
  return axios
    .get<TopicsListResponse>(
      `classrooms/${classroomId}/modules/${moduleId}/topics`
    )
    .then((res: AxiosResponse<TopicsListResponse>) => res.data)
    .catch((error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message || "Failed to fetch module topics.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}

export async function getAllClassroomMaterials({
  classroomId,
}: {
  classroomId: number;
}): Promise<ClassroomAllMaterialResponse> {
  return axios
    .get<ClassroomAllMaterialResponse>(
      `classrooms/${classroomId}/resources?query=materials`
    )
    .then((res: AxiosResponse<ClassroomAllMaterialResponse>) => res.data)
    .catch((error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.message || "Failed to fetch classroom materials.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}

export async function getAllClassroomAssignments({
  classroomId,
}: {
  classroomId: number;
}): Promise<ClassroomAllAssignmentResponse> {
  return axios
    .get<ClassroomAllAssignmentResponse>(
      `student/classrooms/${classroomId}/assignment?query=all`
    )
    .then((res: AxiosResponse<ClassroomAllAssignmentResponse>) => res.data)
    .catch((error) => {
      if (error instanceof Error) {
        const errorMessage = error?.message || "Failed to fetch assignments.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}

export async function getSingleClassroomAssignment({
  classroomId,
  assignmentId,
}: {
  classroomId: number;
  assignmentId: number;
}): Promise<SingleAssignmentResponse> {
  return axios
    .get<SingleAssignmentResponse>(
      `student/classrooms/${classroomId}/assignments/${assignmentId}`
    )
    .then((res: AxiosResponse<SingleAssignmentResponse>) => res.data)
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);

        const errorMessage = error?.message || "Failed to fetch assignment.";
        setNotification({
          type: NotificationType.error,
          content: { title: "Error", text: errorMessage },
        });
      }
      return Promise.reject(error);
    });
}
