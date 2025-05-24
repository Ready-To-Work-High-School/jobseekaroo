
export interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  read?: boolean;
  metadata?: Record<string, any>;
}

export interface NotificationResponse {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  link?: string;
  metadata?: any;
}
