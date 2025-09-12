import { read } from "fs";

export type INotificationType =
  | "assignment"
  | "reminder"
  | "announcement"
  | string;

// export interface Notification {
//   _id: string;
//   sender: string;
//   recipient: string;
//   type: INotificationType;
//   message: string;
//   assignment?: string;
//   isRead: boolean;
//   createdAt: string;
// }

// NotificationDTO.ts

export interface NotificationDTO {
  message: string;
  data: Notification[];
  length: number;
}

export interface Notification {
  id: string;
  type: INotificationType;
  title: string;
  message: string;
  timestamp: string; // ISO 8601 date string
  read: boolean;
  priority: "low" | "medium" | "high" | string;
  created_at: string;
  updated_at: string;
}
