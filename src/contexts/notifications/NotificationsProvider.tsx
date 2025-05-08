
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, NotificationType } from '@/types/notification';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { NotificationFilterOptions, NotificationsContextType } from './types';

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

interface NotificationsProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children, user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Filter state
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
    dateRange: {
      from: null,
      to: null
    },
    sortBy: 'newest'
  });
  
  // Fetch notifications when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);
  
  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user) return;
    
    const channel = supabase
      .channel('notification-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification: Notification = {
            id: payload.new.id,
            user_id: payload.new.user_id,
            title: payload.new.title,
            message: payload.new.message,
            type: payload.new.type as NotificationType,
            read: !!payload.new.read,
            createdAt: payload.new.created_at,
            link: payload.new.link || ''
          };
          
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  // Filter notifications based on filter options
  const filteredNotifications = React.useMemo(() => {
    let filtered = [...notifications];
    
    // Apply type filter
    if (filterOptions.type !== 'all') {
      filtered = filtered.filter(notification => notification.type === filterOptions.type);
    }
    
    // Apply read status filter
    if (filterOptions.read !== 'all') {
      filtered = filtered.filter(notification => notification.read === filterOptions.read);
    }
    
    // Apply date range filter
    if (filterOptions.dateRange.from) {
      filtered = filtered.filter(notification => new Date(notification.createdAt) >= (filterOptions.dateRange.from as Date));
    }
    
    if (filterOptions.dateRange.to) {
      const endDate = new Date(filterOptions.dateRange.to);
      endDate.setHours(23, 59, 59, 999); // End of the day
      filtered = filtered.filter(notification => new Date(notification.createdAt) <= endDate);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
      return filterOptions.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [notifications, filterOptions]);
  
  // Calculate unread count
  const unreadCount = React.useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);
  
  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match the Notification interface
      const transformedData: Notification[] = data.map(item => ({
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        message: item.message,
        type: item.type as NotificationType,
        read: !!item.read,
        createdAt: item.created_at,
        link: item.link || ''
      }));
      
      setNotifications(transformedData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setErrorMessage('Failed to load notifications. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mark notification as read
  const markAsRead = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .is('read', false);
      
      if (error) throw error;
      
      // Update state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  // Delete all notifications
  const clearAll = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update state
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };
  
  // Update filter options
  const updateFilters = (filters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...filters
    }));
  };
  
  // Add a new notification
  const addNotification = async (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: notification.user_id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            link: notification.link || ''
          }
        ])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        const newNotification: Notification = {
          id: data[0].id,
          user_id: data[0].user_id,
          title: data[0].title,
          message: data[0].message,
          type: data[0].type as NotificationType,
          read: false,
          createdAt: data[0].created_at,
          link: data[0].link || ''
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };
  
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
        addNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
