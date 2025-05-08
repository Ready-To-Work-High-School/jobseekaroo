
import { supabase } from '../index';
import { Notification, NotificationType } from '@/types/notification';
import { transformNotification } from './utils';
import { NotificationResponse } from './types';

/**
 * Subscribe to real-time notifications
 */
export function subscribeToNotifications(
  userId: string, 
  callback: (notification: Notification) => void
) {
  return supabase
    .channel('notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    }, (payload) => {
      // Ensure the payload matches NotificationResponse before transforming
      const newNotification = payload.new as NotificationResponse;
      // Transform the payload to a Notification object
      const notification = transformNotification(newNotification);
      callback(notification);
    })
    .subscribe();
}
