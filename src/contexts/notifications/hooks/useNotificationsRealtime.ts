
import { useEffect, useCallback } from 'react';
import { subscribeToNotifications } from '@/lib/supabase/notifications/realtimeNotifications';
import { Notification } from '@/types/notification';

interface UseNotificationsRealtimeProps {
  user: any;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationsRealtime = ({
  user,
  notifications,
  setNotifications
}: UseNotificationsRealtimeProps) => {
  
  const handleNewNotification = useCallback((newNotification: Notification) => {
    setNotifications([newNotification, ...notifications]);
  }, [notifications, setNotifications]);

  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up real-time notifications for user:', user.id);
    
    const cleanup = subscribeToNotifications(user.id, handleNewNotification);

    return () => {
      console.log('Cleaning up real-time notifications subscription');
      cleanup();
    };
  }, [user?.id, handleNewNotification]);
};
