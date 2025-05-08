
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { NotificationsContext } from '@/contexts/notifications/NotificationsContext';
import { Toaster } from 'sonner';
import { useNotificationsRealtime } from './useNotificationsRealtime';
import { useNotificationsState } from './useNotificationsState';

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // Get ALL notification state/hooks from here
  const notificationsState = useNotificationsState();

  // This passes setters & user to the realtime hook
  useNotificationsRealtime({
    user,
    setNotifications: notificationsState.setNotifications,
    setIsLoading: notificationsState.setIsLoading,
    setErrorMessage: notificationsState.setErrorMessage
  });

  // Clean and type-safe Provider
  return (
    <NotificationsContext.Provider value={notificationsState}>
      {children}
      <Toaster />
    </NotificationsContext.Provider>
  );
};
