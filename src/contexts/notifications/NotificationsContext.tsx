
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NotificationsContextType } from './types';
import { useNotificationsState } from './useNotificationsState';
import { useNotificationsData } from './useNotificationsData';
import { NotificationFilterOptions } from '@/types/notification';

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const {
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
    filters,
    setFilters,
    errorMessage
  } = useNotificationsState();

  // Handle data fetching and persistence
  useNotificationsData(setNotifications);

  const value: NotificationsContextType = {
    notifications,
    filteredNotifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    isLoading,
    filters,
    setFilters,
    errorMessage
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
