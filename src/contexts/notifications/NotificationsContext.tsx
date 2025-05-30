
// Re-export from the NotificationsProvider
import { useContext } from 'react';
import { NotificationsContext } from './NotificationsProvider';

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
