
import { useState, useEffect } from 'react';
import { Notification, NotificationFilterOptions } from '@/types/notification';
import { fetchNotifications, markNotificationAsRead, clearAllNotifications } from '@/lib/supabase/notifications';

export const useNotificationsState = (userId?: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');

  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Fetch notifications on component mount and when user ID changes
  useEffect(() => {
    const loadNotifications = async () => {
      if (!userId) {
        setNotifications([]);
        setFilteredNotifications([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchNotifications(userId);
        setNotifications(data);
        applyFilters(data, { type: filterType, status: filterStatus });
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setErrorMessage('Failed to load notifications. Please try again later.');
        setNotifications([]);
        setFilteredNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [userId]);

  // Apply filters whenever filter options change
  useEffect(() => {
    applyFilters(notifications, { type: filterType, status: filterStatus });
  }, [filterType, filterStatus, notifications]);

  // Function to apply filters
  const applyFilters = (notificationsList: Notification[], filters: NotificationFilterOptions) => {
    let filtered = [...notificationsList];

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(notification => notification.type === filters.type);
    }

    // Filter by read status
    if (filters.status === 'read') {
      filtered = filtered.filter(notification => notification.read);
    } else if (filters.status === 'unread') {
      filtered = filtered.filter(notification => !notification.read);
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredNotifications(filtered);
  };

  // Function to mark a notification as read
  const markAsRead = async (id: string) => {
    if (!userId) return;

    try {
      await markNotificationAsRead(id);
      
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    if (!userId || notifications.length === 0) return;

    try {
      // Update each unread notification
      const unreadNotifications = notifications.filter(notification => !notification.read);
      
      for (const notification of unreadNotifications) {
        await markNotificationAsRead(notification.id);
      }
      
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Function to clear all notifications
  const clearAll = async () => {
    if (!userId || notifications.length === 0) return;

    try {
      await clearAllNotifications(userId);
      
      // Update local state
      setNotifications([]);
      setFilteredNotifications([]);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  return {
    notifications,
    filteredNotifications,
    unreadCount,
    isLoading,
    errorMessage,
    markAsRead,
    markAllAsRead,
    clearAll,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus
  };
};
