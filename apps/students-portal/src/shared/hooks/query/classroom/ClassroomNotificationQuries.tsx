import {
  getAllNotificationsCountResponse,
  getAllNotificationsResponse,
} from "@/core/classNotifcationsTypes";
import {
  getAllNotifications,
  getAllNotificationsCount,
} from "@/core/services/classroom/Notifications";
import { IQueryArgs } from "@/core/types/interface/query";
import { useGetResourcesQuery } from "@/shared/hooks/helper/query";

export function useGetAllNotificationsCount() {
  const AllNotifactionCounts: IQueryArgs<getAllNotificationsCountResponse> = {
    key: ["classroomNotificationsCounts"],
    callback: () => getAllNotificationsCount(),
  };
  return useGetResourcesQuery(AllNotifactionCounts);
}

export function useGetAllNotifications() {
  const AllNotifactions: IQueryArgs<getAllNotificationsResponse> = {
    key: ["classroomNotifications"],
    callback: () => getAllNotifications(),
  };
  return useGetResourcesQuery(AllNotifactions);
}
