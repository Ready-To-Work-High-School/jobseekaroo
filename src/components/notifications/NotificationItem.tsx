
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@/types/notification';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  BriefcaseIcon, 
  CheckCircle2, 
  GraduationCap, 
  Mail, 
  MessageSquare, 
  Award
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClose 
}) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleClick = () => {
    markAsRead(notification.id);
    
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'job':
        return <BriefcaseIcon className="h-5 w-5 text-blue-500" />;
      case 'application':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-red-500" />;
      case 'account':
        return <GraduationCap className="h-5 w-5 text-amber-500" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div 
      className={`p-4 relative transition-colors ${
        notification.read ? 'bg-transparent' : 'bg-blue-50/50'
      } ${isHovering ? 'bg-gray-50' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => markAsRead(notification.id)}
      >
        <span className="sr-only">Mark as read</span>
        <CheckCircle2 className="h-3 w-3" />
      </Button>
      
      <div 
        className="flex items-start gap-3 cursor-pointer" 
        onClick={handleClick}
      >
        <div className="mt-1 rounded-full bg-background p-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 space-y-1 text-sm">
          <p className={`${notification.read ? 'font-normal' : 'font-medium'}`}>
            {notification.title}
          </p>
          
          <p className="text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};
