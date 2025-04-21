
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/notification';
import { toast } from '@/hooks/use-toast';

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

export function useNotificationsRealtime({ user, setNotifications, setIsLoading, setErrorMessage }: {
  user: any;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
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
        } else if (data) {
          setNotifications(data.map(transformNotification));
        }
        setIsLoading(false);
      });

    // Real-time subscription for new notifications
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
          if (prev.length > 0 && prev[0].id === newNotification.id) return prev;
          return [newNotification, ...prev];
        });
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, setNotifications, setIsLoading, setErrorMessage]);
}
