
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Bell, Briefcase, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notification } from '@/types/notification';

interface NotificationItemProps {
  notification: Notification;
  markAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification,
  markAsRead
}) => {
  const handleMarkAsRead = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'application':
        return <Briefcase className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getTimeSince = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };
  
  return (
    <Card className={`transition-colors ${notification.read ? 'bg-background' : 'bg-muted/20'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <h4 className="font-medium">{notification.title}</h4>
              <span className="text-xs text-muted-foreground">
                {getTimeSince(notification.createdAt)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{notification.type}</Badge>
                {!notification.read && <Badge className="bg-primary">New</Badge>}
              </div>
              
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleMarkAsRead}
                    className="h-8 flex items-center gap-1 text-xs"
                  >
                    <Check className="h-3 w-3" /> 
                    Mark read
                  </Button>
                )}
                
                {notification.link && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="h-8 text-xs"
                  >
                    <Link to={notification.link}>View</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
