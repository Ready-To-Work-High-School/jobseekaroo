
export type NotificationType = 'job' | 'application' | 'system' | 'reminder';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
}
