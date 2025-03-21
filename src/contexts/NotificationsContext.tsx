
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@supabase/supabase-js';
import { SavedSearch } from '@/types/user';
import { getJobs } from '@/lib/mock-data';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, userProfile } = useAuth();

  // Load notifications from localStorage
  useEffect(() => {
    if (user) {
      const storedNotifications = localStorage.getItem(`notifications-${user.id}`);
      if (storedNotifications) {
        try {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(parsedNotifications.filter((n: Notification) => !n.read).length);
        } catch (error) {
          console.error('Error parsing stored notifications:', error);
        }
      }
    }
  }, [user]);

  // Generate notifications based on saved searches
  const refreshNotifications = () => {
    if (!user || !userProfile?.saved_searches) return;

    // Only check once a day in real app
    const lastChecked = localStorage.getItem(`lastNotificationCheck-${user.id}`);
    const today = new Date().toDateString();
    
    if (lastChecked === today) {
      return; // Already checked today
    }
    
    // Set today as last checked
    localStorage.setItem(`lastNotificationCheck-${user.id}`, today);
    
    generateNotificationsFromSavedSearches(user, userProfile.saved_searches);
  };

  // Auto-refresh on initial load
  useEffect(() => {
    refreshNotifications();
  }, [user, userProfile]);

  const generateNotificationsFromSavedSearches = (user: User, savedSearches: SavedSearch[]) => {
    // For each saved search, find matching jobs
    const allJobs = getJobs();
    const newNotifications: Notification[] = [];
    
    savedSearches.forEach(search => {
      // Simple matching - in a real app, this would use the actual search criteria
      const matchingJobs = allJobs
        .filter(job => {
          // Basic filtering based on location
          if (search.zipCode && job.location.zipCode) {
            return job.location.zipCode === search.zipCode;
          }
          return job.title.toLowerCase().includes(search.name.toLowerCase());
        })
        .slice(0, 2); // Limit to 2 matches per saved search
      
      matchingJobs.forEach(job => {
        newNotifications.push({
          id: `${search.id}-${job.id}`,
          title: `New match for "${search.name}"`,
          message: `${job.title} at ${job.company.name} matches your saved search.`,
          date: new Date(),
          read: false,
          link: `/jobs/${job.id}`
        });
      });
    });
    
    // Add sample onboarding notification if no matches
    if (newNotifications.length === 0 && savedSearches.length > 0) {
      newNotifications.push({
        id: 'welcome-1',
        title: 'Welcome to Job Alerts',
        message: 'We\'ll notify you when new jobs match your saved searches.',
        date: new Date(),
        read: false
      });
    }
    
    // Cache notifications
    if (user) {
      localStorage.setItem(`notifications-${user.id}`, JSON.stringify(newNotifications));
    }
    
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.length);
  };

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`notifications-${user.id}`, JSON.stringify(updatedNotifications));
    }
  };

  const value: NotificationsContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refreshNotifications
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
