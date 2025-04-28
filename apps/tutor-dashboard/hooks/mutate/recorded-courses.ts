import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import { CreateRecordedCourseRequest, CreateRecordedCourseResponse, ModuleResponseDTO } from "@/lib/types/recorded-courses";
import { AddModule, createRecordedCourse, DeleteModule, DeleteRecordedCourse } from "@/services/recordedCourse-service";
import { ModuleTypeData } from "@/app/(dashboard)/courses/[id]/page";


export function useCreateRecordedCourses({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<CreateRecordedCourseRequest, CreateRecordedCourseResponse> = {
    key: ["courses"],
    callback: (data: CreateRecordedCourseRequest) => createRecordedCourse(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}



export function useDeleteRecordedCourses({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<{ id: number }, { message: string }> = {
    key: ["courses"],
    callback: (data: { id: number }) => DeleteRecordedCourse(data.id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


export function useAddModule({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ModuleTypeData, ModuleResponseDTO> = {
    key: ["courses"],
    callback: (data: ModuleTypeData) => AddModule(data,),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


export function useDeleteModule({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<{ id: number, moduleId: number }, { message: string }> = {
    key: ["courses"],
    callback: (data: { id: number, moduleId: number }) => DeleteModule(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}