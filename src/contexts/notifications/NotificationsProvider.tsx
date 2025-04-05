
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { NotificationsProvider as ContextProvider } from '@/contexts/NotificationsContext';
import { toast } from '@/hooks/use-toast';
import { Notification } from '@/types/notification';
import { Toaster } from 'sonner';

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notification-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Show toast for new notifications
          const newNotification = payload.new as Notification;
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });

          // Update local notifications state
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();

    // Initial fetch of existing notifications
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setNotifications(data as Notification[]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setErrorMessage('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <ContextProvider>
      {children}
      <Toaster />
    </ContextProvider>
  );
};
