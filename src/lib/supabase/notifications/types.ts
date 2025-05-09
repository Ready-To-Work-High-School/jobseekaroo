
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

// Define the roles enum type to match what's allowed in the database
export type AppRole = 'admin' | 'moderator' | 'user' | 'ceo';
export type NotificationRole = 'admin' | 'ceo';

// Update DatabaseRole to match exactly what the database expects
export type DatabaseRole = 'admin' | 'moderator' | 'user';
