
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NotificationHeaderProps {
  unreadCount: number;
  onClick: () => void;
}

export const NotificationHeader = ({ unreadCount, onClick }: NotificationHeaderProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      aria-label="Notifications"
      className="relative"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] text-[10px] flex items-center justify-center bg-red-500"
          aria-label={`${unreadCount} unread notifications`}
        >
          {unreadCount}
        </Badge>
      )}
    </Button>
  );
};
