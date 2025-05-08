
import { createContext, useContext } from 'react';
import { Notification, NotificationFilterOptions } from '@/types/notification';

export interface NotificationsContextType {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  filteredNotifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  filterOptions: NotificationFilterOptions;
  updateFilters: (filters: Partial<NotificationFilterOptions>) => void;
  addNotification?: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
