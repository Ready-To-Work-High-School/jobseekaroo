
import React from 'react';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import NotificationFilters from './NotificationFilters';
import NotificationItem from './NotificationItem';

const NotificationContent: React.FC = () => {
  const { 
    notifications, 
    filteredNotifications, 
    isLoading, 
    errorMessage, 
    markAsRead, 
    markAllAsRead, 
    clearAll 
  } = useNotifications();
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <NotificationFilters />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-md" />
          ))}
        </div>
      </div>
    );
  }
  
  if (errorMessage) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }
  
  if (notifications.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium text-muted-foreground">
          No notifications yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Check back later for updates
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 p-4">
      <NotificationFilters />
      
      {filteredNotifications.length === 0 ? (
        <Alert className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Notifications Found</AlertTitle>
          <AlertDescription>
            No notifications match the current filters.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              markAsRead={markAsRead}
            />
          ))}
        </div>
      )}
      
      {notifications.length > 0 && (
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
          <Button variant="ghost" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
