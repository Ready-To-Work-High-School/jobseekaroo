
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification } from '@/types/notification';
import NotificationItem from './NotificationItem';
import NotificationEmpty from './NotificationEmpty';

interface NotificationContentProps {
  unreadCount: number;
  filteredNotifications: Notification[];
  markAllAsRead: () => void;
  onClose: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
  unreadCount,
  filteredNotifications,
  markAllAsRead,
  onClose,
  isLoading,
  errorMessage
}) => {
  return (
    <>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 px-2">
              <Check className="mr-1 h-3.5 w-3.5" />
              <span className="text-xs">Mark all read</span>
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-0">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-6 w-6 rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : errorMessage ? (
          <div className="p-4 text-center text-muted-foreground">
            {errorMessage}
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <NotificationEmpty />
        )}
      </ScrollArea>
    </>
  );
};

export default NotificationContent;
