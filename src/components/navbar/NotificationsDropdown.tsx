
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { 
  fetchUserNotifications, 
  markNotificationAsRead 
} from '@/contexts/auth/services/notificationService';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

interface NotificationsDropdownProps {
  onClose: () => void;
  onNotificationsRead: (count: number) => void;
}

const NotificationsDropdown = ({ onClose, onNotificationsRead }: NotificationsDropdownProps) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadNotifications = async () => {
      if (user) {
        setIsLoading(true);
        const data = await fetchUserNotifications(user.id);
        setNotifications(data as Notification[]);
        setIsLoading(false);
      }
    };
    
    loadNotifications();
  }, [user]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markNotificationAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
      onNotificationsRead(1);
    }
  };
  
  return (
    <Card 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto z-50 shadow-lg"
    >
      <div className="p-2 border-b bg-muted/50">
        <h3 className="font-medium">Notifications</h3>
      </div>
      
      <div className="divide-y">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">Loading notifications...</div>
        ) : notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-3 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              {notification.link ? (
                <Link to={notification.link} className="block">
                  <NotificationContent notification={notification} />
                </Link>
              ) : (
                <NotificationContent notification={notification} />
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">No notifications</div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-2 border-t bg-muted/50">
          <Link 
            to="/admin/notifications" 
            className="text-xs text-blue-600 hover:underline block text-center"
          >
            View all notifications
          </Link>
        </div>
      )}
    </Card>
  );
};

const NotificationContent = ({ notification }: { notification: Notification }) => {
  return (
    <>
      <h4 className="font-medium text-sm">{notification.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
      </p>
    </>
  );
};

export default NotificationsDropdown;
