
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
        <Bell className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold">No notifications yet</h3>
      <p className="text-muted-foreground">
        When you receive notifications, they'll appear here.
      </p>
    </div>
  );
};

export default NotificationEmpty;
