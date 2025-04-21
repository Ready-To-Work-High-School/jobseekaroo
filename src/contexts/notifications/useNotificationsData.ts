
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import { Notification } from '@/types/notification';

// This is now a stub—no fetching/subscription logic. Provider is responsible for all data.
// All future hooks just call setNotifications with new lists (if needed).
export const useNotificationsData = (
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Intentionally blank: logic moved to NotificationsProvider for a single source of truth.
  // All notification data now flows from the provider via context.
};
