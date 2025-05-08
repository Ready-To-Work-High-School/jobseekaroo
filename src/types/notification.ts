
export type NotificationType = 'system' | 'application' | 'job' | 'message';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link: string;
  metadata: Record<string, any>;
}

export interface NotificationFilterOptions {
  type?: string | null;
  status?: 'all' | 'unread' | 'read';
}
