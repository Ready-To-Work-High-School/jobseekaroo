
import { Notification, NotificationFilters } from '@/types/notification';

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
  filters: NotificationFilters;
  setFilters: (filters: Partial<NotificationFilters>) => void;
  errorMessage: string | null;
}
