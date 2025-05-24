
import { NotificationRow, NotificationResponse } from './types';
import { Notification } from '@/types/notification';

/**
 * Transform a database notification row to the frontend notification format
 */
export function transformNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    message: row.message,
    type: row.type,
    read: row.read,
    createdAt: row.created_at,
    link: row.link,
    metadata: typeof row.metadata === 'string' ? JSON.parse(row.metadata) : (row.metadata || {})
  };
}

/**
 * Transform multiple database notification rows
 */
export function transformNotifications(rows: NotificationRow[]): Notification[] {
  return rows.map(transformNotification);
}
