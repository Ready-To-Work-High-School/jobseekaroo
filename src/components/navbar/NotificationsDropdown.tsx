
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/auth';

const NotificationsDropdown = () => {
  const { user } = useAuth();
  const [hasNotifications, setHasNotifications] = React.useState(false);
  
  // Dummy check for notifications
  React.useEffect(() => {
    // Simulate checking for notifications
    const hasUnread = Math.random() > 0.5;
    setHasNotifications(hasUnread);
  }, []);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="text-sm font-medium">Notifications</h4>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            {hasNotifications 
              ? "You have new notifications" 
              : "No new notifications"}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
