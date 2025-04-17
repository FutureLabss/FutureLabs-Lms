import { IMutationHook, IMutationArgs } from "@/lib/types/query";
import { useCreateResources } from "../helper/mutation";
import { createClasscroom } from "@/services/class-service";
import { ClassroomScheduleResponse } from "@/lib/types/classroom";

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