
import React from 'react';
import { Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';

interface NotificationHeaderProps {
  onFilterClick: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({ onFilterClick }) => {
  const { unreadCount } = useNotifications();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Bell className="h-6 w-6 mr-2 text-primary" />
        <h2 className="text-2xl font-bold">Notifications</h2>
        {unreadCount > 0 && (
          <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onFilterClick}
        className="flex items-center"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default NotificationHeader;
