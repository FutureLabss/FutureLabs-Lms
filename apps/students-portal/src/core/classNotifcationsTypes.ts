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
