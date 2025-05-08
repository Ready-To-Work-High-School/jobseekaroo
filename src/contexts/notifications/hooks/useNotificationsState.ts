
import { useState } from 'react';
import { Notification } from '@/types/notification';
import { NotificationFilterOptions } from '../types';

export function useNotificationsState() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
  });
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  
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
  
  const updateFilters = (newFilters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  };
  
  return {
    notifications,
    setNotifications,
    filteredNotifications,
    unreadCount,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    filterOptions,
    updateFilters,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
  };
}
