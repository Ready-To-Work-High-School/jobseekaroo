
import { useState, useEffect } from 'react';
import { Notification } from '@/types/notification';
import { useAuth } from '../AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

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
    // Update locally only
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
    
    // Update locally only
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    // Update locally
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAll = () => {
    if (notifications.length === 0) return;
    
    // Update locally
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    setNotifications
  };
};
