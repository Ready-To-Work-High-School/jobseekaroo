
import React, { createContext, ReactNode } from 'react';
import { NotificationsContextType } from './types';
import { useNotificationsState } from './hooks/useNotificationsState';
import { useNotificationsOperations } from './hooks/useNotificationsOperations';
import { useNotificationsRealtime } from './hooks/useNotificationsRealtime';

interface NotificationsProviderProps {
  children: ReactNode;
  user: any;
}

// Create the context with default values
export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  setNotifications: () => {},
  filteredNotifications: [],
  unreadCount: 0,
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  clearAll: async () => {},
  filterOptions: { type: 'all', read: 'all' },
  updateFilters: () => {},
  filterType: null,
  setFilterType: () => {},
  filterStatus: 'all',
  setFilterStatus: () => {},
});

export const NotificationsProvider = ({ children, user }: NotificationsProviderProps) => {
  // Manage state with custom hooks
  const state = useNotificationsState();
  const operations = useNotificationsOperations(user?.id, state.setNotifications);
  
  // Set up real-time notifications
  useNotificationsRealtime(
    user, 
    state.setNotifications,
    state.setIsLoading,
    state.setErrorMessage
  );

  // Combine all values for the context
  const contextValue: NotificationsContextType = {
    ...state,
    ...operations
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
