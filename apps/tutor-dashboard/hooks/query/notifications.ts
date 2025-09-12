import { getAllNotifications } from "@/services/notifications";
import { useGetResourcesQuery } from "../helper/query";
import { IQueryArgs } from "@/lib/types/query";
import { NotificationDTO } from "@/lib/types/Notification";

// getAllNotifications
export function useGetAllNotifications() {
  const getNotification: IQueryArgs<NotificationDTO> = {
    key: ["notification"],
    callback: () => getAllNotifications(),
  };
  return useGetResourcesQuery(getNotification);
}
