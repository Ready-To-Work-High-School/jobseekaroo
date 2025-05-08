
import { supabase } from '../index';
import { Notification, NotificationType } from '@/types/notification';
import { transformNotification } from './utils';

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
      // Transform the payload to a Notification object
      const notification = transformNotification(payload.new);
      callback(notification);
    })
    .subscribe();
}
