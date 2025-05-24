
export interface NotificationFilterOptions {
  type: string;
  read: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  sortBy: 'newest' | 'oldest';
}

export interface NotificationsContextType {
  notifications: any[];
  filteredNotifications: any[];
  unreadCount: number;
  isLoading: boolean;
  errorMessage: string | null;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  filterOptions: NotificationFilterOptions;
  updateFilters: (newFilters: Partial<NotificationFilterOptions>) => void;
}
