
export interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  read?: boolean;
  metadata?: Record<string, any>;
}
