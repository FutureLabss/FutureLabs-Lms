export interface GetNotificationsCountResponse {
  message: string;
  count: number;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface GetNotificationsResponse {
  message: string;
  data: Notification[];
}



export interface NotificationDTO {
  message: string;
  data: NotificationData;
}

export interface NotificationData {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message: string;
    tag: string;
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}
