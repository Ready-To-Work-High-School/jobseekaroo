
import React, { createContext, useContext, useState, useEffect } from 'react';

export type NotificationType = 'job' | 'application' | 'system' | 'reminder';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
  metadata?: Record<string, any>;
}

interface NotificationsContextType {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  notifications: Notification[];
  filteredNotifications: Notification[];
  filterType: NotificationType | null;
  setFilterType: (type: NotificationType | null) => void;
  filterStatus: 'all' | 'unread' | 'read';
  setFilterStatus: (status: 'all' | 'unread' | 'read') => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const NotificationsContext = createContext<NotificationsContextType>({
  unreadCount: 0,
  setUnreadCount: () => {},
  notifications: [],
  filteredNotifications: [],
  filterType: null,
  setFilterType: () => {},
  filterStatus: 'all',
  setFilterStatus: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  isLoading: false,
  errorMessage: null,
});

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterType, setFilterType] = useState<NotificationType | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter notifications based on type and status
  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = !filterType || notification.type === filterType;
    const statusMatch = filterStatus === 'all' || 
      (filterStatus === 'unread' && !notification.read) ||
      (filterStatus === 'read' && notification.read);
    
    return typeMatch && statusMatch;
  });

  // Update unread count when notifications change
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const value = {
    unreadCount,
    setUnreadCount,
    notifications,
    filteredNotifications,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    markAsRead,
    markAllAsRead,
    isLoading,
    errorMessage,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
