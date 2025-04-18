import { useState, useEffect } from 'react';
import { Bell, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import { NotificationItem } from './NotificationItem';
import { EmptyNotifications } from './EmptyNotifications';
import { NotificationFilters } from './NotificationFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { validateUrl } from '@/utils/sanitization';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { 
    filteredNotifications, 
    unreadCount, 
    markAllAsRead,
    isLoading,
    errorMessage
  } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('[data-notification-center]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (link?: string) => {
    if (!link) return;
    
    if (link.startsWith('/')) {
      return true;
    }
    
    return validateUrl(link);
  };

  if (!user) return null;

  return (
    <div className="relative" data-notification-center>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
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
      
      {isOpen && (
        <Card 
          className="absolute right-0 mt-2 w-[90vw] md:w-[450px] max-h-[80vh] overflow-hidden shadow-lg z-50 flex flex-col"
          data-notification-center
        >
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
                onClick={() => setIsOpen(false)}
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
                        onClose={() => setIsOpen(false)}
                        urlValidator={handleNotificationClick}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyNotifications />
                )}
              </div>
              
              <div className="p-3 border-t text-center">
                <Link to="/notifications" onClick={() => setIsOpen(false)}>
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
              
              <Link to="/notification-preferences" onClick={() => setIsOpen(false)}>
                <Button size="sm">
                  Manage Preferences
                </Button>
              </Link>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};
