
import { NotificationType } from '@/types/notification';

export interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  metadata?: Record<string, any>;
}

export interface NotificationResponse {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
  link?: string;
  metadata: Record<string, any>;
}

export type NotificationRole = 'admin' | 'ceo';
