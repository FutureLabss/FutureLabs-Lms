export interface getAllNotificationsCountResponse {
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

export interface getAllNotificationsResponse {
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


export interface NotificationResponseDto {
  message: string;
  data: NotificationDataDto;
}

export interface NotificationDataDto {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationInnerDataDto;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationInnerDataDto {
  message: string;
  tag: string;
  priority: "low" | "medium" | "high";
  type: "assignment" | string;
}
