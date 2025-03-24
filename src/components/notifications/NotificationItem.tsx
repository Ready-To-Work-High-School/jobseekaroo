
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
  Award,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClose 
}) => {
  const navigate = useNavigate();
  const { markAsRead, removeNotification } = useNotifications();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
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
        notification.read ? 'bg-transparent' : 'bg-blue-50/50 dark:bg-blue-950/20'
      } ${isHovering ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-3 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!notification.read && (
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                markAsRead(notification.id);
              }}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div 
        className="flex items-start gap-3 cursor-pointer" 
        onClick={handleClick}
      >
        <div className="mt-1 rounded-full bg-background p-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 space-y-1 text-sm pr-6">
          <p className={`${!notification.read ? 'font-medium' : 'font-normal'}`}>
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
