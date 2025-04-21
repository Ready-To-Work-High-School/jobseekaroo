
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { NotificationsProvider as ContextProvider } from '@/contexts/NotificationsContext';
import { Notification } from '@/types/notification';
import { Toaster } from 'sonner';
import { useNotificationsRealtime } from './useNotificationsRealtime';

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use the new hook for realtime logic
  useNotificationsRealtime({
    user,
    setNotifications,
    setIsLoading,
    setErrorMessage
  });

  // Provide notification state/context to children
  return (
    <ContextProvider
      value={{
        notifications,
        isLoading,
        errorMessage,
        setNotifications
      }}
    >
      {children}
      <Toaster />
    </ContextProvider>
  );
};
