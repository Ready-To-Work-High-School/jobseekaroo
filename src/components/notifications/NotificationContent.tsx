
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { NotificationItem } from './NotificationItem';
import { EmptyNotifications } from './EmptyNotifications';
import { NotificationFilters } from './NotificationFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { validateUrl } from '@/utils/sanitization';
import { Notification } from '@/types/notification';

interface NotificationContentProps {
  unreadCount: number;
  markAllAsRead: () => void;
  onClose: () => void;
  filteredNotifications: Notification[];
  isLoading: boolean;
  errorMessage?: string | null;
}

export const NotificationContent = ({
  unreadCount,
  markAllAsRead,
  onClose,
  filteredNotifications,
  isLoading,
  errorMessage
}: NotificationContentProps) => {
  const handleNotificationClick = (link?: string) => {
    if (!link) return false;
    
    if (link.startsWith('/')) {
      return true;
    }
    
    return validateUrl(link);
  };

  return (
    <Tabs defaultValue="notifications" className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <TabsList className="grid w-[220px] grid-cols-2">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <TabsContent 
        value="notifications" 
        className="flex-1 flex flex-col overflow-hidden m-0 border-none"
      >
        <div className="p-3 border-b flex items-center justify-between">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-8"
            >
              Mark all as read
            </Button>
          )}
          <div className="flex items-center ml-auto">
            <Badge variant="secondary" className="ml-auto">
              {unreadCount} unread
            </Badge>
          </div>
        </div>

        <div className="p-3">
          <NotificationFilters />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : errorMessage ? (
            <Alert variant="destructive" className="m-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onClose={onClose}
                  urlValidator={handleNotificationClick}
                />
              ))}
            </div>
          ) : (
            <EmptyNotifications />
          )}
        </div>
        
        <div className="p-3 border-t text-center">
          <Link to="/notifications" onClick={onClose}>
            <Button variant="link" size="sm" className="h-8 text-xs">
              View All Notifications
            </Button>
          </Link>
        </div>
      </TabsContent>
      
      <TabsContent 
        value="preferences" 
        className="flex-1 overflow-y-auto m-0 border-none p-4"
      >
        <h3 className="text-sm font-medium mb-4">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Manage your notification settings and preferences
        </p>
        
        <Link to="/notification-preferences" onClick={onClose}>
          <Button size="sm">
            Manage Preferences
          </Button>
        </Link>
      </TabsContent>
    </Tabs>
  );
};
