
import { createContext, useContext, ReactNode } from 'react';
import { NotificationsContextType } from './types';
import { useNotificationsState } from './useNotificationsState';

// NotificationsContext provides notification state to any consumer
export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Update the export structure to match what NotificationsProvider is importing
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
