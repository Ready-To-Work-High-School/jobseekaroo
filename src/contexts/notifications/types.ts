
import { Notification, NotificationType } from '@/types/notification';

export interface NotificationFilterOptions {
  type: NotificationType | 'all';
  read: boolean | 'all';
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  sortBy: 'newest' | 'oldest';
}

export interface NotificationsContextType {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  filteredNotifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (error: string | null) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  filterOptions: NotificationFilterOptions;
  updateFilters: (filters: Partial<NotificationFilterOptions>) => void;
}
