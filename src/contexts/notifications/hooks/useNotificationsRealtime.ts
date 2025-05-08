
import { useEffect } from 'react';
import { fetchNotifications, subscribeToNotifications } from '@/lib/supabase/notifications';
import { Notification } from '@/types/notification';
import { useToast } from '@/hooks/use-toast';

export function useNotificationsRealtime(
  user: any,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  const { toast } = useToast();

  // Load notifications and handle real-time updates
  useEffect(() => {
    if (!user) return;
    
    const loadNotifications = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        const data = await fetchNotifications(user.id);
        setNotifications(data);
      } catch (error) {
        console.error('Error loading notifications:', error);
        setErrorMessage('Failed to load notifications. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load notifications',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotifications();
    
    // Subscribe to real-time notifications
    const subscription = subscribeToNotifications(user.id, (newNotification) => {
      // Use function form to avoid stale state issues
      setNotifications(prev => [newNotification, ...prev]);
      
      toast({
        title: 'New Notification',
        description: newNotification.title,
      });
    });
    
    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [user, setNotifications, setIsLoading, setErrorMessage, toast]);
}
