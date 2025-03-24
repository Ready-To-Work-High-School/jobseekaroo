
import { Notification } from '@/types/notification';

const STORAGE_KEY = 'user_notifications';

export const saveNotificationsToStorage = (userId: string, notifications: Notification[]) => {
  try {
    const userStorageKey = `${STORAGE_KEY}_${userId}`;
    localStorage.setItem(userStorageKey, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to storage:', error);
  }
};

export const getNotificationsFromStorage = (userId: string): Notification[] => {
  try {
    const userStorageKey = `${STORAGE_KEY}_${userId}`;
    const storedNotifications = localStorage.getItem(userStorageKey);
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('Error getting notifications from storage:', error);
    return [];
  }
};

export const clearNotificationsFromStorage = (userId: string) => {
  try {
    const userStorageKey = `${STORAGE_KEY}_${userId}`;
    localStorage.removeItem(userStorageKey);
  } catch (error) {
    console.error('Error clearing notifications from storage:', error);
  }
};
