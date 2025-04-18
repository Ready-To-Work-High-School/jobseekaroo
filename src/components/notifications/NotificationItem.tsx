
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Notification } from '@/types/notification';
import { useNotifications } from '@/contexts/NotificationsContext';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
  urlValidator: (url?: string) => boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClose,
  urlValidator
}) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      // Check if the URL is safe before navigating
      const isUrlSafe = urlValidator(notification.link);
      
      if (isUrlSafe) {
        // If it's an internal link (starts with /)
        if (notification.link.startsWith('/')) {
          navigate(notification.link);
        } else {
          // For external links, open in new tab with security attributes
          window.open(
            notification.link, 
            '_blank', 
            'noopener,noreferrer'
          );
        }
      } else {
        console.error('Potentially unsafe URL blocked:', notification.link);
        // Optionally show a toast or other user feedback
      }
    }
    
    onClose();
  };
  
  const formattedDate = notification.createdAt
    ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
    : '';
    
  return (
    <div 
      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
          {notification.title}
        </h4>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      {!notification.read && (
        <div className="mt-1">
          <Badge variant="secondary" className="text-xs px-1.5 py-0">New</Badge>
        </div>
      )}
    </div>
  );
};
