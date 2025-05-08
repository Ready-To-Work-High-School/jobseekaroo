
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { NotificationsContext } from './NotificationsContext';
import { NotificationsContextType, NotificationFilterOptions } from './types';
import { Notification, NotificationType } from '@/types/notification';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/hooks/useAuth';

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Define default filter options
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
    dateRange: {
      from: null,
      to: null,
    },
    sortBy: 'newest',
  });
  
  // Update filters handler
  const updateFilters = useCallback((filters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...filters }));
  }, []);

  // Add a new notification
  const addNotification = useCallback((notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      id: uuidv4(),
      read: false,
      createdAt: new Date().toISOString(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Optionally save to database
    if (user) {
      supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          link: notification.link
        }])
        .then((response) => {
          if (response.error) {
            console.error('Error saving notification:', response.error);
          }
        });
    }
  }, [user]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    // Update in database
    if (user) {
      supabase
        .from('notifications')
        .update({ read: true })
        .match({ id, user_id: user.id })
        .then((response) => {
          if (response.error) {
            console.error('Error marking notification as read:', response.error);
          }
        });
    }
  }, [user]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // Update in database
    if (user) {
      supabase
        .from('notifications')
        .update({ read: true })
        .match({ user_id: user.id })
        .then((response) => {
          if (response.error) {
            console.error('Error marking all notifications as read:', response.error);
          }
        });
    }
  }, [user]);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
    
    // Delete from database
    if (user) {
      supabase
        .from('notifications')
        .delete()
        .match({ user_id: user.id })
        .then((response) => {
          if (response.error) {
            console.error('Error clearing notifications:', response.error);
          }
        });
    }
  }, [user]);

  // Fetch notifications on user change
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          // Map the database columns to our Notification type
          const fetchedNotifications: Notification[] = data.map(item => ({
            id: item.id,
            title: item.title,
            message: item.message,
            type: item.type as NotificationType,
            read: item.read,
            createdAt: item.created_at,
            link: item.link
          }));
          
          setNotifications(fetchedNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setErrorMessage('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotifications();
    
    // Set up realtime subscription
    const subscription = supabase
      .channel('notifications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          // Handle different event types
          if (payload.eventType === 'INSERT') {
            const newNotification = payload.new as any;
            setNotifications(prev => [{
              id: newNotification.id,
              title: newNotification.title,
              message: newNotification.message,
              type: newNotification.type as NotificationType,
              read: newNotification.read,
              createdAt: newNotification.created_at,
              link: newNotification.link
            }, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedNotification = payload.new as any;
            setNotifications(prev => prev.map(notification => 
              notification.id === updatedNotification.id 
                ? {
                    ...notification,
                    title: updatedNotification.title,
                    message: updatedNotification.message,
                    read: updatedNotification.read,
                    type: updatedNotification.type as NotificationType,
                    link: updatedNotification.link
                  }
                : notification
            ));
          } else if (payload.eventType === 'DELETE') {
            const deletedNotification = payload.old as any;
            setNotifications(prev => prev.filter(notification => notification.id !== deletedNotification.id));
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);
  
  // Apply filters to get filtered notifications
  const filteredNotifications = notifications.filter(notification => {
    // Filter by type
    if (filterOptions.type !== 'all' && notification.type !== filterOptions.type) {
      return false;
    }
    
    // Filter by read status
    if (filterOptions.read !== 'all' && notification.read !== filterOptions.read) {
      return false;
    }
    
    // Filter by date range
    if (filterOptions.dateRange.from && new Date(notification.createdAt) < filterOptions.dateRange.from) {
      return false;
    }
    
    if (filterOptions.dateRange.to && new Date(notification.createdAt) > filterOptions.dateRange.to) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by date
    if (filterOptions.sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });
  
  // Get unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const contextValue: NotificationsContextType = {
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
    addNotification
  };
  
  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
