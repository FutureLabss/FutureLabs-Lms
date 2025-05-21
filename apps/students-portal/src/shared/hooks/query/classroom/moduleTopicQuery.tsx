import {
  getAllClassroomAssignments,
  getAllClassroomMaterials,
  getAllModuleTopics,
  getSingleModuleTopic,
} from "@/core/services/classroom/ModuleTopics.";
import { useGetResourcesQuery } from "../../helper/query";
import { IQueryArgs } from "@/core/types/interface/query";
import {
  ClassroomAllAssignmentResponse,
  ClassroomAllMaterialResponse,
  SingleModuleTopicResponse,
  TopicsListResponse,
} from "@/core/types/interface/classroom.ts/moduleTopics";

export function useGetSingleModuleTopic(
  classroomId: number,
  moduleId: number,
  topicId: number
) {
  const singleModuleTopic: IQueryArgs<SingleModuleTopicResponse> = {
    key: ["moduleTopic", { classroomId, moduleId, topicId }],
    callback: () => getSingleModuleTopic({ topicId, classroomId, moduleId }),
  };
  return useGetResourcesQuery(singleModuleTopic);
}

export function useGetAllModuleTopics(
  classroomId: number,
  moduleId: number,
  enabled: boolean
) {
  const allModuleTopics: IQueryArgs<TopicsListResponse> = {
    key: ["moduleTopic", { classroomId, moduleId }],
    callback: () => getAllModuleTopics({ classroomId, moduleId }),
  };
  return useGetResourcesQuery(allModuleTopics, { enabled });
}

export function useGetAllClassroomMaterials(
  classroomId: number,
  enabled: boolean
) {
  const allModuleTopics: IQueryArgs<ClassroomAllMaterialResponse> = {
    key: ["classrommTopics", { classroomId }],
    callback: () => getAllClassroomMaterials({ classroomId }),
  };
  return useGetResourcesQuery(allModuleTopics, { enabled });
}

export function useGetAllClassroomAssignments(
  classroomId: number,
  enabled: boolean
) {
  const allModuleTopics: IQueryArgs<ClassroomAllAssignmentResponse> = {
    key: ["classrommAssignment", { classroomId }],
    callback: () => getAllClassroomAssignments({ classroomId }),
  };
  return useGetResourcesQuery(allModuleTopics, { enabled });
}
