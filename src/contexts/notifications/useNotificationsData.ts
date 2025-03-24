
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Notification } from '@/types/notification';
import { 
  fetchNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  removeNotification as removeNotificationFromDb,
  clearAllNotifications,
  subscribeToNotifications
} from '@/lib/supabase/notifications';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useNotificationsData = (
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Load notifications when user changes
  useEffect(() => {
    let notificationsChannel: RealtimeChannel | null = null;

    const loadNotifications = async () => {
      if (!user) {
        setNotifications([]);
        return;
      }

      if (setIsLoading) setIsLoading(true);
      if (setErrorMessage) setErrorMessage(null);

      try {
        // Load from Supabase
        const data = await fetchNotifications(user.id);
        setNotifications(data);

        // Subscribe to realtime notifications
        notificationsChannel = subscribeToNotifications(user.id, (newNotification) => {
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast for new notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });
        });
      } catch (error) {
        console.error('Error loading notifications:', error);
        if (setErrorMessage) setErrorMessage('Failed to load notifications. Please try again.');
        
        toast({
          title: 'Error loading notifications',
          description: 'Please try refreshing the page.',
          variant: 'destructive'
        });
      } finally {
        if (setIsLoading) setIsLoading(false);
      }
    };

    loadNotifications();

    // Clean up subscription
    return () => {
      if (notificationsChannel) {
        notificationsChannel.unsubscribe();
      }
    };
  }, [user, setNotifications, toast, setIsLoading, setErrorMessage]);

  // Sync operations with Supabase
  useEffect(() => {
    const handleMarkAsRead = async (id: string) => {
      if (!user) return;
      
      try {
        await markNotificationAsRead(id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
        toast({
          title: 'Error',
          description: 'Failed to mark notification as read.',
          variant: 'destructive'
        });
      }
    };

    const handleMarkAllAsRead = async () => {
      if (!user) return;
      
      try {
        await markAllNotificationsAsRead(user.id);
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
        toast({
          title: 'Error',
          description: 'Failed to mark all notifications as read.',
          variant: 'destructive'
        });
      }
    };

    const handleRemoveNotification = async (id: string) => {
      if (!user) return;
      
      try {
        await removeNotificationFromDb(id);
      } catch (error) {
        console.error('Error removing notification:', error);
        toast({
          title: 'Error',
          description: 'Failed to remove notification.',
          variant: 'destructive'
        });
      }
    };

    const handleClearAllNotifications = async () => {
      if (!user) return;
      
      try {
        await clearAllNotifications(user.id);
      } catch (error) {
        console.error('Error clearing all notifications:', error);
        toast({
          title: 'Error',
          description: 'Failed to clear all notifications.',
          variant: 'destructive'
        });
      }
    };

    // Expose these methods to the component
    return () => {};
  }, [user, toast]);
};
