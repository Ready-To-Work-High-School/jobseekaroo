
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  clearAllNotifications 
} from '@/lib/supabase/notifications';

export function useNotificationsOperations(
  userId?: string,
  setNotifications?: React.Dispatch<React.SetStateAction<any[]>>
) {
  const { toast } = useToast();
  
  const markAsRead = useCallback(async (id: string) => {
    if (!userId || !setNotifications) return;
    
    try {
      await markNotificationAsRead(id);
      
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update notification',
        variant: 'destructive',
      });
    }
  }, [userId, setNotifications, toast]);

  const markAllAsRead = useCallback(async () => {
    if (!userId || !setNotifications) return;
    
    try {
      await markAllNotificationsAsRead(userId);
      
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
      
      toast({
        title: 'Success',
        description: 'All notifications marked as read',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update notifications',
        variant: 'destructive',
      });
    }
  }, [userId, setNotifications, toast]);

  const clearAll = useCallback(async () => {
    if (!userId || !setNotifications) return;
    
    try {
      await clearAllNotifications(userId);
      
      setNotifications([]);
      toast({
        title: 'Success',
        description: 'All notifications cleared',
      });
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear notifications',
        variant: 'destructive',
      });
    }
  }, [userId, setNotifications, toast]);

  return {
    markAsRead,
    markAllAsRead,
    clearAll
  };
}
