
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

  // Helper function to convert db notification to app notification
  const transformNotification = (dbNotification: any): Notification => ({
    id: dbNotification.id,
    user_id: dbNotification.user_id,
    title: dbNotification.title,
    message: dbNotification.message,
    type: dbNotification.type,
    link: dbNotification.link,
    read: dbNotification.read,
    createdAt: dbNotification.created_at,
    metadata: dbNotification.metadata
  });

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Initial fetch
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setErrorMessage('Failed to fetch notifications');
          setNotifications([]);
        } else {
          setNotifications(data.map(transformNotification));
        }
        setIsLoading(false);
      });

    // Subscribe to real-time notifications for this user
    const channel = supabase
      .channel('notification-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const newNotification = transformNotification(payload.new);

        setNotifications(prev => {
          // Avoid double-adding if there are repeated events
          if (prev.length > 0 && prev[0].id === newNotification.id) return prev;
          return [newNotification, ...prev];
        });

        // Show toast on new notification (immediate feedback)
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // ContextProvider lives here, and will inject current state to all consumers
  return (
    <ContextProvider /* legacy, an alias for NotificationsContext.Provider */>
      {children}
      <Toaster />
    </ContextProvider>
  );
};
