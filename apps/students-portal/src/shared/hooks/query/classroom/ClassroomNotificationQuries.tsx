import {
  GetNotificationsCountResponse,
  GetNotificationsResponse,
} from "@/core/classNotifcationsTypes";
import {
  getNotifications,
  getNotificationsCount,
  markNotificationAsRead,
} from "@/core/services/classroom/Notifications";
import { IAPIFilter, IQueryArgs } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";

export function useGetNotificationsCount() {
  const AllNotifactionCounts: IQueryArgs<GetNotificationsCountResponse> = {
    key: ["classroomNotificationsCount"],
    callback: () => getNotificationsCount(),
  };
  return useGetResourcesQuery(AllNotifactionCounts);
}

export function useGetAllNotifications() {
  const AllNotifactions: IQueryArgs<GetNotificationsResponse> = {
    key: ["classroomNotifications"],
    callback: () => getNotifications(),
  };
  return useGetResourcesQuery(AllNotifactions);
}

export function useGetSingleNotification(id: string) {
  const singleNotification: IQueryArgs<Notification> = {
    key: ["singleNotification", id as unknown as IAPIFilter],
    callback: () => markNotificationAsRead(id as string),
  };
  return useGetResourcesQuery(singleNotification);
}
