
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '@/types/notification';
import { useNotificationsState } from './useNotificationsState';

// Define the proper type for the notifications context
export interface NotificationsContextType {
  notifications: Notification[];
  filteredNotifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  errorMessage: string | null;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  filterStatus: 'all' | 'unread' | 'read';
  setFilterStatus: (status: 'all' | 'unread' | 'read') => void;
}

// Export the context so it can be imported directly
export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode; user: any }> = ({ children, user }) => {
  const {
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
    setFilterStatus
  } = useNotificationsState();

  // Mock fetch notifications based on user
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch notifications from an API
      // For now, we'll just set some mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: user?.id || 'anon',
          title: 'New job alert',
          message: 'A new job matching your profile has been posted',
          type: 'job',
          read: false,
          createdAt: new Date().toISOString(),
          link: '/jobs',
          metadata: {}
        },
        {
          id: '2',
          userId: user?.id || 'anon',
          title: 'Application update',
          message: 'Your application status has been updated',
          type: 'application',
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          link: '/profile',
          metadata: {}
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    } else {
      setNotifications([]);
    }
  }, [user, setNotifications, setIsLoading]);

  // Implement the notification actions
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Create the context value with all required properties
  const contextValue: NotificationsContextType = {
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

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Export the hook to use the context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
