
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import NotificationItem from './NotificationItem';
import NotificationEmpty from './NotificationEmpty';

export interface NotificationContentProps {
  unreadCount?: number;
  filteredNotifications?: any[];
  markAllAsRead?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
  unreadCount,
  markAllAsRead,
  onClose,
  filteredNotifications,
  isLoading,
  errorMessage
}) => {
  const notifications = useNotifications();
  
  // Use props if provided, otherwise use context values
  const count = unreadCount ?? notifications.unreadCount;
  const notifs = filteredNotifications ?? notifications.filteredNotifications;
  const handleMarkAllAsRead = markAllAsRead ?? notifications.markAllAsRead;
  const loading = isLoading ?? notifications.isLoading;
  const error = errorMessage ?? notifications.errorMessage;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-medium">Notifications</h3>
          {count > 0 && (
            <p className="text-xs text-muted-foreground">{count} unread</p>
          )}
        </div>
        <div className="flex gap-2">
          {notifs.length > 0 && count > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-xs"
            >
              Close
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : notifs.length === 0 ? (
          <NotificationEmpty />
        ) : (
          <div className="divide-y divide-border">
            {notifs.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationContent;
