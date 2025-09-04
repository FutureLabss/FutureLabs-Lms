// import { Noti } from "@/core/classNotifcationsTypes";
import { markNotificationAsRead } from "@/core/services/classroom/Notifications";
import { IMutationArgs, IMutationHook } from "@/core/types/interface/query";
import { useCreateResources } from "../helper/mutation";
import { NotificationResponseDto } from "@/core/classNotifcationsTypes";


export function useMarkNotificationAsRead({ onSuccess, onError, options }: IMutationHook) {
  const singleNotification: IMutationArgs<string, NotificationResponseDto> = {
    key: ["classroomNotificationsCounts"],
    callback: (id: string) => markNotificationAsRead(id),
    onSuccess,
    onError,
    options
  };
  return useCreateResources(singleNotification);
}



