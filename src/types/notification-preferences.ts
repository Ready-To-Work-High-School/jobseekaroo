
export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  job_notifications: boolean;
  application_notifications: boolean;
  message_notifications: boolean;
  account_notifications: boolean;
  achievement_notifications: boolean;
  created_at: string;
  updated_at: string;
}
