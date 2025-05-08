
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Briefcase, 
  MessageSquare,
  CircleAlert,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import { Notification } from '@/types/notification';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // If there's a link, navigate to it
    if (notification.link) {
      navigate(notification.link);
      if (onClose) onClose();
    }
  };
  
  // Get the notification icon based on type
  const getIcon = () => {
    switch (notification.type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'application':
        return <CircleAlert className="h-5 w-5 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-auto p-4 flex items-start gap-3 justify-start hover:bg-muted/50",
        notification.read ? "opacity-70" : "bg-blue-50/50 dark:bg-blue-900/10"
      )}
      onClick={handleClick}
    >
      <div className="mt-1 flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-grow text-left">
        <h4 className="font-medium text-sm">{notification.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {notification.message}
        </p>
        <p className="text-[10px] text-muted-foreground mt-2">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
      
      {!notification.read && (
        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
      )}
    </Button>
  );
};

export default NotificationItem;
