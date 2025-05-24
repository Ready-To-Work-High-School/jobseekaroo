
import { useState, useMemo } from 'react';
import { Notification, NotificationType } from '@/types/notification';
import { NotificationFilterOptions } from '../types';

export const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<NotificationFilterOptions>({
    type: 'all',
    read: 'all',
    dateRange: {
      from: null,
      to: null
    },
    sortBy: 'newest'
  });

  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Apply type filter
    if (filterOptions.type !== 'all') {
      filtered = filtered.filter(notif => notif.type === filterOptions.type);
    }

    // Apply read status filter
    if (filterOptions.read !== 'all') {
      const isReadFilter = filterOptions.read === 'read';
      filtered = filtered.filter(notif => notif.read === isReadFilter);
    }

    // Apply date range filter
    if (filterOptions.dateRange.from) {
      filtered = filtered.filter(notif => 
        new Date(notif.createdAt) >= filterOptions.dateRange.from!
      );
    }
    if (filterOptions.dateRange.to) {
      filtered = filtered.filter(notif => 
        new Date(notif.createdAt) <= filterOptions.dateRange.to!
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return filterOptions.sortBy === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return filtered;
  }, [notifications, filterOptions]);

  const unreadCount = useMemo(() => 
    notifications.filter(notif => !notif.read).length, 
    [notifications]
  );

  const updateFilters = (newFilters: Partial<NotificationFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  };

  return {
    notifications,
    setNotifications,
    filteredNotifications,
    unreadCount,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    filterOptions,
    updateFilters
  };
};
