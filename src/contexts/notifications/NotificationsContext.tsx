
import { createContext, useContext } from 'react';
import { NotificationsContextType } from './types';

// NotificationsContext provides notification state to any consumer
export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// useNotifications hook provides access to the notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
