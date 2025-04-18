
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { useNotificationVisibility } from '@/hooks/useNotificationVisibility';
import { NotificationHeader } from './NotificationHeader';
import { NotificationContent } from './NotificationContent';

export const NotificationCenter = () => {
  const { isOpen, setIsOpen } = useNotificationVisibility();
  const { user } = useAuth();
  const { 
    filteredNotifications, 
    unreadCount, 
    markAllAsRead,
    isLoading,
    errorMessage
  } = useNotifications();

  if (!user) return null;

  return (
    <div className="relative" data-notification-center>
      <NotificationHeader 
        unreadCount={unreadCount} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      
      {isOpen && (
        <Card 
          className="absolute right-0 mt-2 w-[90vw] md:w-[450px] max-h-[80vh] overflow-hidden shadow-lg z-50 flex flex-col"
          data-notification-center
        >
          <NotificationContent 
            unreadCount={unreadCount}
            markAllAsRead={markAllAsRead}
            onClose={() => setIsOpen(false)}
            filteredNotifications={filteredNotifications}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </Card>
      )}
    </div>
  );
};
