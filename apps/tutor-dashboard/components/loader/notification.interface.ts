import { NotificationType } from "@/lib/types/enum/notification";
import { IPlaceholderContent } from "@/lib/types/generic/placeholder";


export interface NotificationData {
  delay?: number;
  type?: NotificationType;
  content?: IPlaceholderContent;
}
