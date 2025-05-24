
export interface NotificationRow {
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

export interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type: string;
  read?: boolean;
  link?: string;
  metadata?: any;
}
