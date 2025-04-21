
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { NotificationsContext } from '@/contexts/notifications/NotificationsContext';
import { Notification } from '@/types/notification';
import { Toaster } from 'sonner';
import { useNotificationsRealtime } from './useNotificationsRealtime';
import { useNotificationsState } from './useNotificationsState';

// Change to import the context directly and create the provider locally
export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const notificationsState = useNotificationsState();

  // Use the new hook for realtime logic
  useNotificationsRealtime({
    user,
    setNotifications,
    setIsLoading,
    setErrorMessage
  });

  // Create the provider directly with the NotificationsContext
  return (
    <NotificationsContext.Provider
      value={{
        ...notificationsState,
        notifications,
        isLoading,
        errorMessage,
        setNotifications
      }}
    >
      {children}
      <Toaster />
    </NotificationsContext.Provider>
  );
};
