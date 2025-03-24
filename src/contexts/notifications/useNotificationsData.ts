
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Notification } from '@/types/notification';
import { getNotificationsFromStorage, saveNotificationsToStorage } from './notificationsStorage';

export const useNotificationsData = (
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Load notifications from local storage when user changes
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    // Load from local storage
    const storedNotifications = getNotificationsFromStorage(user.id);
    setNotifications(storedNotifications);
  }, [user, setNotifications]);

  // Save notifications to local storage when they change
  useEffect(() => {
    if (!user) return;

    const handleSaveNotifications = (notifications: Notification[]) => {
      saveNotificationsToStorage(user.id, notifications);
    };

    // Subscribe to notifications changes to save them
    const handleStorageEffect = () => {
      setNotifications(prev => {
        handleSaveNotifications(prev);
        return prev;
      });
    };

    // Initial save
    setNotifications(prev => {
      handleSaveNotifications(prev);
      return prev;
    });

    // Update storage when window is about to unload
    window.addEventListener('beforeunload', handleStorageEffect);

    return () => {
      window.removeEventListener('beforeunload', handleStorageEffect);
    };
  }, [user, setNotifications]);
};
