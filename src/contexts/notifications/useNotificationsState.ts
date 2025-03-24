
import { useState, useEffect, useMemo } from 'react';
import { Notification, NotificationFilters } from '@/types/notification';
import { useAuth } from '../AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { isAfter, isBefore, parseISO } from 'date-fns';

const DEFAULT_FILTERS: NotificationFilters = {
  type: 'all',
  read: 'all',
  dateRange: {
    from: null,
    to: null
  },
  sortBy: 'newest'
};

export const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<NotificationFilters>(DEFAULT_FILTERS);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Apply filters to notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filter by type
      if (filters.type && filters.type !== 'all' && notification.type !== filters.type) {
        return false;
      }
      
      // Filter by read status
      if (filters.read !== 'all' && notification.read !== filters.read) {
        return false;
      }
      
      // Filter by date range
      if (filters.dateRange?.from && !isBefore(parseISO(notification.createdAt), filters.dateRange.from)) {
        return false;
      }
      
      if (filters.dateRange?.to && !isAfter(parseISO(notification.createdAt), filters.dateRange.to)) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by created date
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [notifications, filters]);

  // Count unread notifications
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (!user) return;

    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      user_id: user.id,
      createdAt: new Date().toISOString(),
      read: false
    };

    // Update locally
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    if (notifications.length === 0) return;
    
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAll = () => {
    if (notifications.length === 0) return;
    setNotifications([]);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<NotificationFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return {
    notifications,
    filteredNotifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    setNotifications,
    isLoading,
    setIsLoading,
    filters,
    setFilters: updateFilters,
    errorMessage,
    setErrorMessage
  };
};
