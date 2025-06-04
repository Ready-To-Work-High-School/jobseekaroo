
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const NavbarNotifications = () => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  
  if (!user) {
    return null;
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => navigate('/notifications')}
      aria-label={`${unreadCount} unread notifications`}
      className="relative"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] text-[10px] flex items-center justify-center bg-red-500"
          aria-hidden="true"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};
