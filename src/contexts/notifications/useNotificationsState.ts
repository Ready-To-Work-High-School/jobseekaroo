import { useState, useEffect, useMemo } from 'react';
import { Notification, NotificationFilterOptions } from '@/types/notification';
import { useAuth } from '@/contexts/auth';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { isAfter, isBefore, parseISO } from 'date-fns';

const DEFAULT_FILTERS: NotificationFilterOptions = {
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
  const [filters, setFilters] = useState<NotificationFilterOptions>(DEFAULT_FILTERS);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      if (filters.type && filters.type !== 'all' && notification.type !== filters.type) {
        return false;
      }
      
      if (filters.read !== 'all' && notification.read !== filters.read) {
        return false;
      }
      
      if (filters.dateRange?.from && !isBefore(parseISO(notification.createdAt), filters.dateRange.from)) {
        return false;
      }
      
      if (filters.dateRange?.to && !isAfter(parseISO(notification.createdAt), filters.dateRange.to)) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [notifications, filters]);

  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (!user) return;

    const newNotification: Notification = {
      id: uuidv4(),
      ...notification,
      user_id: user.id,
      createdAt: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    if (notifications.length === 0) return;
    
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAll = () => {
    if (notifications.length === 0) return;
    setNotifications([]);
  };

  const updateFilters = (newFilters: Partial<NotificationFilterOptions>) => {
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
