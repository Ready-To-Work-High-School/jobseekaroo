
import React, { createContext, useContext, ReactNode } from 'react';
import { Notification } from '@/types/notification';
import { useNotificationsState } from './useNotificationsState';
import { useNotificationsRealtime } from './useNotificationsRealtime';

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

export interface NotificationsProviderProps {
  children: ReactNode;
  user?: any; // Make user optional
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ 
  children, 
  user 
}) => {
  const {
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
  } = useNotificationsState(user?.id);

  // Set up realtime listener for notifications
  useNotificationsRealtime(user?.id);

  return (
    <NotificationsContext.Provider value={{
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
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};
