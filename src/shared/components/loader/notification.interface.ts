import { NotificationType } from "@/core/types/enum/notification";
import { IPlaceholderContent } from "@/core/types/interface/generic/placeholder";


export interface NotificationData {
  delay?: number;
  type?: NotificationType;
  content?: IPlaceholderContent;
}
