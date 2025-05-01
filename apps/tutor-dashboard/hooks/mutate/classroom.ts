import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import { createClasscroom, createClasscroomMaterials, createClasscroomModules, createClasscroomModulesTopic } from "@/services/class-service";
import { ClassroomScheduleResponse, IclassRoomMaterials, IclassRoomModules, Itopic } from "@/lib/types/classroom";

//   use mutate for CreateClassroom
export function useCreateClassroom({ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ClassroomScheduleResponse, ClassroomScheduleResponse> = {
        key: ["classroom"],
        callback: (data:ClassroomScheduleResponse,) => createClasscroom(data),
        onSuccess: onSuccess,
        onError: onError,
        options,
  };
    return useCreateResources(mutation);
  }
    //   use mutate for DeleteClassroom
export function useDeleteClassroom({ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ClassroomScheduleResponse, ClassroomScheduleResponse> = {
        key: ["classroom"],
        callback: (data:ClassroomScheduleResponse,) => createClasscroom(data),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
  }
  //   use mutate for CreateClassroomModules
export function useCreateClassroomModules({ onSuccess, onError, options, classroomId}: IMutationHook & { classroomId: string }) {
    const mutation: IMutationArgs<IclassRoomModules, IclassRoomModules> = {
        key: ["ClassroomModules"],
        callback: (data:IclassRoomModules) => createClasscroomModules(data, classroomId),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
  }
//   use mutate for CreateClassroomMaterial
export function useCreateClassroomMaterial({ onSuccess, onError, options, classroomId, topicId}:
   IMutationHook & { topicId: string, classroomId:string }) {
    const mutation: IMutationArgs<IclassRoomMaterials, IclassRoomMaterials> = {
        key: ["ClassroomMaterials"],
        callback: (data:IclassRoomMaterials) => createClasscroomMaterials(data, classroomId, topicId),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
  }

//   use mutate for ClassroomModulesTopic
export function useCreateClassroomModulesTopic({ onSuccess, onError, options, moduleId, classroomId}:
   IMutationHook & { moduleId: string |undefined | null, classroomId:string |undefined | null, }) {
    const mutation: IMutationArgs<Itopic, Itopic> = {
        key: ["ClassroomModulesTopics"],
        callback: (data:Itopic) => createClasscroomModulesTopic(data, moduleId, classroomId),
        onSuccess: onSuccess,
        onError: onError,
        options,
    };
    return useCreateResources(mutation);
  }