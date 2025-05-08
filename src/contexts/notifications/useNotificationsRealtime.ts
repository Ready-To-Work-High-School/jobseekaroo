
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useNotificationsRealtime = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;

    // Set up realtime listener for notifications
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload: any) => {
          // Display toast notification
          const notification = payload.new;
          
          toast.info(notification.title, {
            description: notification.message,
            action: notification.link ? {
              label: 'View',
              onClick: () => window.location.href = notification.link
            } : undefined
          });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
};
