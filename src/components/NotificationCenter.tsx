
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { UserProfile, SavedSearch } from '@/types/user';
import { Job } from '@/types/job';
import { getJobs } from '@/lib/mock-data';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  link?: string;
}

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && userProfile?.saved_searches) {
      generateNotificationsFromSavedSearches(userProfile.saved_searches);
    }
  }, [user, userProfile]);

  const generateNotificationsFromSavedSearches = (savedSearches: SavedSearch[]) => {
    // Only do this once a day in real app, using localStorage to track
    const lastChecked = localStorage.getItem('lastNotificationCheck');
    const today = new Date().toDateString();
    
    if (lastChecked === today) {
      // Load cached notifications if available
      const cachedNotifications = localStorage.getItem('jobNotifications');
      if (cachedNotifications) {
        const parsed = JSON.parse(cachedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter((n: Notification) => !n.read).length);
      }
      return;
    }
    
    // Set today as last checked
    localStorage.setItem('lastNotificationCheck', today);
    
    // For each saved search, find matching jobs
    const allJobs = getJobs();
    const newNotifications: Notification[] = [];
    
    savedSearches.forEach(search => {
      // Simple matching - in a real app, this would use the actual search criteria
      const matchingJobs = allJobs
        .filter(job => {
          // Basic filtering based on location
          if (search.zipCode && job.location.zipCode) {
            return job.location.zipCode === search.zipCode;
          }
          return job.title.toLowerCase().includes(search.name.toLowerCase());
        })
        .slice(0, 2); // Limit to 2 matches per saved search
      
      matchingJobs.forEach(job => {
        newNotifications.push({
          id: `${search.id}-${job.id}`,
          title: `New match for "${search.name}"`,
          message: `${job.title} at ${job.company.name} matches your saved search.`,
          date: new Date(),
          read: false,
          link: `/jobs/${job.id}`
        });
      });
    });
    
    // Add sample onboarding notification if no matches
    if (newNotifications.length === 0 && savedSearches.length > 0) {
      newNotifications.push({
        id: 'welcome-1',
        title: 'Welcome to Job Alerts',
        message: 'We\'ll notify you when new jobs match your saved searches.',
        date: new Date(),
        read: false
      });
    }
    
    // Cache notifications
    localStorage.setItem('jobNotifications', JSON.stringify(newNotifications));
    
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.length);
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    
    // Save to localStorage
    localStorage.setItem('jobNotifications', JSON.stringify(updatedNotifications));
    
    // Navigate to link if it exists
    if (notification.link) {
      window.location.href = notification.link;
    }
    
    // Close notification center
    setIsOpen(false);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('jobNotifications', JSON.stringify(updatedNotifications));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <div className="relative">
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
        <Card className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[70vh] overflow-y-auto shadow-lg z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium text-lg">Notifications</h3>
            <div className="flex gap-2">
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="divide-y">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">New</Badge>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm text-muted-foreground">No notifications yet.</p>
                <p className="text-xs mt-1">Save job searches to get alerts for new matches.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
