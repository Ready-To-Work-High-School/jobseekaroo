
import React, { memo, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Briefcase, Building2, GraduationCap, User, Menu, Shield, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdminStatus } from '@/hooks/useAdminStatus';

const MobileBottomNavigation = memo(() => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Skip rendering on auth pages
  const authPaths = useMemo(() => [
    '/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'
  ], []);
  
  if (authPaths.includes(location.pathname)) {
    return null;
  }
  
  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => {
    const baseItems = [
      { icon: Home, label: 'Home', path: '/' },
      { icon: Briefcase, label: 'Jobs', path: '/jobs' },
      { icon: School, label: 'School', path: '/school-integration' },
      { icon: User, label: 'Profile', path: user ? '/profile' : '/sign-in' },
    ];

    // Add admin/CEO items if space allows and user is authenticated
    if (user && (isAdmin || isCeo)) {
      // If we have admin access, show a "More" menu for additional items
      return [
        ...baseItems.slice(0, 3),
        { icon: Menu, label: 'More', path: '#more' }
      ];
    }

    return baseItems;
  }, [user, isAdmin, isCeo]);

  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);

  const renderNavItem = (item: any, index: number) => {
    // Special handling for the "More" menu
    if (item.path === '#more') {
      return (
        <Sheet key="more-menu" open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
          <SheetTrigger asChild>
            <button 
              className="flex flex-col items-center py-2 px-1 w-full text-muted-foreground hover:text-primary transition-colors"
              aria-label="Open more menu"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[40vh]">
            <div className="space-y-4 pt-4">
              <div className="flex flex-col space-y-1">
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => cn(
                    "flex items-center p-3 rounded-md transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  )}
                  onClick={() => setIsMoreMenuOpen(false)}
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Profile</span>
                </NavLink>
                
                {isAdmin && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Shield className="mr-3 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Admin</span>
                  </NavLink>
                )}
                
                {isCeo && (
                  <NavLink 
                    to="/ceo-portal" 
                    className={({ isActive }) => cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      "bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 bg-clip-text text-transparent",
                      isActive ? "font-bold" : ""
                    )}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Shield className="mr-3 h-4 w-4 text-amber-500" />
                    <span>CEO Portal</span>
                  </NavLink>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    }
    
    const isActive = item.path === '/' 
      ? location.pathname === '/' 
      : location.pathname.startsWith(item.path);
    
    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={() => cn(
          'flex flex-col items-center py-2 px-1 relative transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
        )}
      >
        <>
          {isActive && (
            <motion.div 
              layoutId="bottomNavIndicator"
              className="absolute top-0 h-0.5 w-12 bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </>
      </NavLink>
    );
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 min-h-[60px]">
        {navigationItems.map(renderNavItem)}
      </div>
    </nav>
  );
});

MobileBottomNavigation.displayName = 'MobileBottomNavigation';

export default MobileBottomNavigation;
