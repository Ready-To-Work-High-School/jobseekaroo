
import { useState } from 'react';
import { Notification } from '@/types/notification';

export function useNotificationsState() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  
  return {
    notifications,
    setNotifications,
    filteredNotifications,
    unreadCount,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
  };
}
