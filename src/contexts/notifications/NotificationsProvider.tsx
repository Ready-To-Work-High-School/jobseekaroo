import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Notification, NotificationType } from '@/types/notification';
import { NotificationsContextType, NotificationFilterOptions } from './types';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/lib/supabase/notifications';

interface NotificationsProviderProps {
  children: ReactNode;
  user: any;
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  setNotifications: () => {},
  filteredNotifications: [],
  unreadCount: 0,
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  clearAll: async () => {},
  filterOptions: { type: 'all', read: 'all' },
  updateFilters: () => {},
  filterType: null,
  setFilterType: () => {},
  filterStatus: 'all',
  setFilterStatus: () => {},
});

export const NotificationsProvider = ({ children, user }: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
  });
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadNotifications();
      subscribeToNotifications();
    }
    return () => {
      unsubscribeFromNotifications();
    };
  }, [user]);

  // Subscribe to real-time notifications
  const subscribeToNotifications = () => {
    if (!user) return;

    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        const newNotification: Notification = {
          id: payload.new.id,
          user_id: payload.new.user_id,
          title: payload.new.title,
          message: payload.new.message,
          type: payload.new.type as NotificationType,
          read: payload.new.read,
          createdAt: payload.new.created_at,
          link: payload.new.link || '',
          metadata: payload.new.metadata ? (typeof payload.new.metadata === 'object' ? payload.new.metadata : {}) : {},
        };
        setNotifications((prev) => [newNotification, ...prev]);
        toast({
          title: 'New Notification',
          description: payload.new.title,
        });
      })
      .subscribe();

    return channel;
  };

  const unsubscribeFromNotifications = () => {
    supabase.channel('notifications').unsubscribe();
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const data = await fetchNotifications(user.id);
      if (data) {
        setNotifications(data);
      }
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

  const markAsRead = async (id: string) => {
    if (!user) return;
    
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
  };

  const markAllAsRead = async () => {
    if (!user || unreadCount === 0) return;
    
    try {
      await markAllNotificationsAsRead(user.id);
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
  };

  const clearAll = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
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
  };

  const updateFilters = useCallback((newFilters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Filter notifications based on current filter options
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filterType && notification.type !== filterType) {
      return false;
    }
    
    // Filter by read status
    if (filterStatus === 'read' && !notification.read) {
      return false;
    }
    if (filterStatus === 'unread' && notification.read) {
      return false;
    }
    
    return true;
  });

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        filteredNotifications,
        unreadCount,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        markAsRead,
        markAllAsRead,
        clearAll,
        filterOptions,
        updateFilters,
        filterType,
        setFilterType,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
