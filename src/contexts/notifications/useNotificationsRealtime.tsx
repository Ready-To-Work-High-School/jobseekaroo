
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { fetchNotifications, subscribeToNotifications } from '@/lib/supabase/notifications';
import { Notification } from '@/types/notification';
import { toast } from 'sonner';

interface UseNotificationsRealtimeProps {
  user: User | null;
  setNotifications: (notifications: Notification[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export const useNotificationsRealtime = ({
  user,
  setNotifications,
  setIsLoading,
  setErrorMessage
}: UseNotificationsRealtimeProps) => {
  // Load notifications and set up real-time subscription
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    const loadNotifications = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const notifications = await fetchNotifications(user.id);
        setNotifications(notifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
        setErrorMessage('Failed to load notifications. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();

    // Set up real-time subscription for new notifications
    const subscription = subscribeToNotifications(user.id, (notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Show toast for new notification
      toast.info(notification.title, {
        description: notification.message,
        duration: 5000,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, setNotifications, setIsLoading, setErrorMessage]);
};
