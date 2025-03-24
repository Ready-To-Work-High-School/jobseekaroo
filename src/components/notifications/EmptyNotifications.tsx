
import { Bell } from 'lucide-react';

export const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="rounded-full bg-secondary p-3 mb-3">
        <Bell className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No notifications</h3>
      <p className="text-sm text-muted-foreground text-center mt-1">
        You're all caught up! We'll notify you when there's something new.
      </p>
    </div>
  );
};
