
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthStatus from '@/components/AuthStatus';
import { useAuth } from '@/contexts/AuthContext';
import { Bell } from 'lucide-react';
import { fetchUserNotifications } from '@/contexts/auth/services/notificationService';
import NotificationsDropdown from './NotificationsDropdown';

export function NavbarRight() {
  const { user, userProfile } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const isAdmin = userProfile?.user_type === 'admin';
  
  useEffect(() => {
    let isMounted = true;
    
    const loadNotifications = async () => {
      if (user && isAdmin) {
        const notifications = await fetchUserNotifications(user.id);
        if (isMounted) {
          setUnreadNotifications(notifications.filter(n => !n.read).length);
        }
      }
    };
    
    loadNotifications();
    
    // Poll for new notifications every 30 seconds for admins
    let interval: number | undefined;
    if (user && isAdmin) {
      interval = window.setInterval(loadNotifications, 30000);
    }
    
    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [user, isAdmin]);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          {isAdmin && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <NotificationsDropdown 
                  onClose={() => setShowNotifications(false)}
                  onNotificationsRead={(count) => setUnreadNotifications(prev => Math.max(0, prev - count))}
                />
              )}
            </div>
          )}
          <AuthStatus />
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
