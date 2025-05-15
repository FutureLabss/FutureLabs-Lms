import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import { AddMaterialResponse, AddVideoResponse, CreateRecordedCourseRequest, CreateRecordedCourseResponse, ModuleResponseDTO } from "@/lib/types/recorded-courses";
import { AddMaterial, AddModule, AddVideo, createRecordedCourse, DeleteModule, DeleteModuleMaterial, DeleteModuleVideo, DeleteRecordedCourse } from "@/services/recordedCourse-service";
import { MaterialTypeData, ModuleTypeData, VideoTypeData } from "@/app/(dashboard)/courses/[id]/page";


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
    key: ["recordedCourse"],
    callback: (data: ModuleTypeData) => AddModule(data,),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


export function useDeleteModule({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<{ id: number, moduleId: number }, { message: string }> = {
    key: ["recordedCourse"],
    callback: (data: { id: number, moduleId: number }) => DeleteModule(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


export function useAddCourseVideo({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<VideoTypeData, AddVideoResponse> = {
    key: ["recordedCourse"],
    callback: (data: VideoTypeData) => AddVideo(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useAddCourseMaterial({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<MaterialTypeData, AddMaterialResponse> = {
    key: ["recordedCourse"],
    callback: (data: MaterialTypeData) => AddMaterial(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


export function useDeleteCourseModuleVideo({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<{ moduleId: number, videoId: number }, { message: string }> = {
    key: ["recordedCourse"],
    callback: (data: { moduleId: number, videoId: number }) => DeleteModuleVideo(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteCourseModuleMaterial({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<{ moduleId: number, materialId: number }, { message: string }> = {
    key: ["recordedCourse"],
    callback: (data: { moduleId: number, materialId: number }) => DeleteModuleMaterial(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}