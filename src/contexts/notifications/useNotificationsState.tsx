
import { useState, useCallback } from 'react';
import { Notification } from '@/types/notification';
import { NotificationsContextType, NotificationFilterOptions } from './types';

export const useNotificationsState = (): NotificationsContextType => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
    dateRange: {
      from: null,
      to: null,
    },
    sortBy: 'newest',
  });

  // Computed filtered notifications based on filterOptions
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filterOptions.type !== 'all' && notification.type !== filterOptions.type) {
      return false;
    }

    // Filter by read status
    if (filterOptions.read !== 'all') {
      if (filterOptions.read === true && !notification.read) return false;
      if (filterOptions.read === false && notification.read) return false;
    }

    // Filter by date range
    if (
      filterOptions.dateRange.from &&
      new Date(notification.createdAt) < filterOptions.dateRange.from
    ) {
      return false;
    }

    if (
      filterOptions.dateRange.to &&
      new Date(notification.createdAt) > filterOptions.dateRange.to
    ) {
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

  // Computed unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Update filter options
  const updateFilters = useCallback((newFilters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
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
    updateFilters
  };
};
