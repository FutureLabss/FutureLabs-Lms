import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import { CreateRecordedCourseRequest, CreateRecordedCourseResponse } from "@/lib/types/recorded-courses";
import { createRecordedCourse } from "@/services/recordedCourse-service";


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