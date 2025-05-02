import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import {
  addStudentToClass,
  createClasscroom,
  createClasscroomMaterials,
  createClasscroomModules,
  createClasscroomModulesTopic,
} from "@/services/class-service";
import {
  ClassroomScheduleResponse,
  IclassRoomMaterials,
  IclassRoomModules,
  Itopic,
} from "@/lib/types/classroom";
import { AddStudentResponse } from "@/lib/types/get-student";

//   use mutate for CreateClassroom
export function useCreateClassroom({
  onSuccess,
  onError,
  options,
}: IMutationHook) {
  const mutation: IMutationArgs<
    ClassroomScheduleResponse,
    ClassroomScheduleResponse
  > = {
    key: ["classroom"],
    callback: (data: ClassroomScheduleResponse) => createClasscroom(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
//   use mutate for DeleteClassroom
export function useDeleteClassroom({
  onSuccess,
  onError,
  options,
}: IMutationHook) {
  const mutation: IMutationArgs<
    ClassroomScheduleResponse,
    ClassroomScheduleResponse
  > = {
    key: ["classroom"],
    callback: (data: ClassroomScheduleResponse) => createClasscroom(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
//   use mutate for CreateClassroomModules
export function useCreateClassroomModules({
  onSuccess,
  onError,
  options,
  classroomId,
}: IMutationHook & { classroomId: string }) {
  const mutation: IMutationArgs<IclassRoomModules, IclassRoomModules> = {
    key: ["ClassroomModules"],
    callback: (data: IclassRoomModules) =>
      createClasscroomModules(data, classroomId),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
//   use mutate for CreateClassroomMaterial
export function useCreateClassroomMaterial({ onSuccess, onError, options, topicId, classroomId}: IMutationHook & { topicId: string, classroomId:string }) {
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
export function useCreateClassroomModulesTopic({
  onSuccess,
  onError,
  options, classroomId,
  moduleId,
}:
   IMutationHook & { classroomId: string |undefined | null, moduleId:string |undefined | null, }) {
  const mutation: IMutationArgs<Itopic, Itopic> = {
    key: ["ClassroomModulesTopics"],
    callback: (data: Itopic) => createClasscroomModulesTopic(data, classroomId, moduleId ),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useAddStudentToClassroom({
  onSuccess,
  onError,
  options,
}: IMutationHook) {
  const mutation: IMutationArgs<
    { classroomId: string; userId: number },
    AddStudentResponse
  > = {
    key: ["addStudentToClassroom"],
    callback: (data: { classroomId: string; userId: number }) =>
      addStudentToClass(data.classroomId, data.userId),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
