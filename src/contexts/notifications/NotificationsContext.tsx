
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NotificationsContextType } from './types';
import { useNotificationsState } from './useNotificationsState';
import { NotificationFilterOptions } from '@/types/notification';

// NotificationsContext provides notification state to any consumer
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
    setNotifications, // this will now just update with new lists provided by the central provider
    isLoading,
    filters,
    setFilters,
    errorMessage
  } = useNotificationsState();

  // This provider ONLY manages local filtering, counts, etc. (all state injected by main provider)
  return (
    <NotificationsContext.Provider value={{
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
    }}>
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
