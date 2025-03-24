
import { Notification, NotificationFilterOptions } from '@/types/notification';

export interface NotificationsContextType {
  notifications: Notification[];
  filteredNotifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  isLoading: boolean;
  filters: NotificationFilterOptions;
  setFilters: (filters: Partial<NotificationFilterOptions>) => void;
  errorMessage: string | null;
}
