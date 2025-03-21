
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useNotifications, Notification } from '@/contexts/NotificationsContext';

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleClick = () => {
    markAsRead(notification.id);
    
    if (notification.link) {
      navigate(notification.link);
    }
    
    onClose();
  };
  
  return (
    <div 
      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
          {notification.title}
        </h4>
        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
      </div>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      {!notification.read && (
        <div className="mt-1">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">New</Badge>
        </div>
      )}
    </div>
  );
};
