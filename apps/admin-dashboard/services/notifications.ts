import { apiClient } from "@/lib/api-client";
import { NotificationDTO } from "@/lib/types/Notification";

export async function getAllNotifications(): Promise<NotificationDTO> {
  const Promise = apiClient
    .get<NotificationDTO>("notifications")
    .then((response) => {
      return response;
    });
  return Promise;
}
