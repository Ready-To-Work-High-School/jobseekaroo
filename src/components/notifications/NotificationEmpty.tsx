
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationEmpty = () => {
  return (
    <div className="py-12 px-4 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-muted">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No notifications</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        When you receive notifications, they'll appear here. Stay tuned for updates about jobs, applications, and messages.
      </p>
    </div>
  );
};

export default NotificationEmpty;
