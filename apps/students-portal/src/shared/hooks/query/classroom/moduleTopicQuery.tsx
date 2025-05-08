import { getSingleModuleTopic } from "@/core/services/classroom/ModuleTopics.";
import { useGetResourcesQuery } from "../../helper/query";
import { IQueryArgs } from "@/core/types/interface/query";
import { SingleModuleTopicResponse } from "@/core/types/interface/classroom.ts/moduleTopics";

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
