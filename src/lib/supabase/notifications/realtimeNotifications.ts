
import { supabase } from '@/lib/supabase';
import { Notification, NotificationType } from '@/types/notification';

export const subscribeToNotifications = (
  userId: string,
  onNotification: (notification: Notification) => void
) => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const notification: Notification = {
          id: payload.new.id,
          userId: payload.new.user_id,
          title: payload.new.title,
          message: payload.new.message,
          type: payload.new.type as NotificationType,
          read: payload.new.read,
          createdAt: payload.new.created_at,
          link: payload.new.link,
          metadata: payload.new.metadata || {}
        };
        onNotification(notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
