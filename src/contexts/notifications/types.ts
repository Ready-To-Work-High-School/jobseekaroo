
import { Notification, NotificationType } from '@/types/notification';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface NotificationFilterOptions {
  type?: string | 'all';
  read?: boolean | 'all';
  dateRange?: DateRange;
  sortBy?: 'newest' | 'oldest';
}

export interface NotificationsContextType {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  filteredNotifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  markAsRead: (id: string) => Promise<void> | void;
  markAllAsRead: () => Promise<void> | void;
  clearAll: () => Promise<void> | void;
  filterOptions: NotificationFilterOptions;
  updateFilters: (filters: Partial<NotificationFilterOptions>) => void;
  addNotification?: (notification: Omit<Notification, "id" | "read" | "createdAt">) => Promise<void> | void;
  // Add the new properties
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  filterStatus: 'all' | 'unread' | 'read';
  setFilterStatus: (status: 'all' | 'unread' | 'read') => void;
}
