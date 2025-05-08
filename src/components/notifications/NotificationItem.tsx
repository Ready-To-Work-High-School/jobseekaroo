
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/notification';
import { useNotifications } from '@/contexts/NotificationsContext';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    markAsRead(notification.id);
    
    if (notification.link) {
      navigate(notification.link);
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'job':
        return <Bell className="h-5 w-5 text-green-500" />;
      case 'application':
        return <Mail className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div 
      className={cn(
        "p-4 hover:bg-muted/50 cursor-pointer",
        !notification.read && "bg-muted/20"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className={cn("font-medium text-sm", !notification.read && "font-semibold")}>{notification.title}</h4>
            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">{notification.message}</p>
          <div className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
