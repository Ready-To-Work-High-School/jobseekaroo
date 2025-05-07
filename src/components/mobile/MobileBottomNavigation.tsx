
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Briefcase, Building2, GraduationCap, User, Menu, Shield, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth'; // Fixed import path
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdminStatus } from '@/hooks/useAdminStatus';

const MobileBottomNavigation = () => {
  const location = useLocation();
  const { user, userProfile } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Skip rendering on certain paths
  if (['/sign-in', '/sign-up', '/forgot-password'].includes(location.pathname)) {
    return null;
  }
  
  // Define base navigation items
  const baseNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: School, label: 'School', path: '/school-integration' },
  ];
  
  // Add admin and CEO items if applicable
  let navItems = [...baseNavItems];
  
  // If there are 5 or more items already, use a "More" menu instead
  if (navItems.length >= 5) {
    navItems = navItems.slice(0, 4);
    navItems.push({ icon: Menu, label: 'More', path: '#more' });
  } else {
    // We have room to add profile link
    navItems.push({ icon: User, label: 'Profile', path: '/profile' });
  }
  
  // Handle More menu sheet state
  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50 md:hidden">
      <nav className="grid grid-cols-5">
        {navItems.map(({ icon: Icon, label, path }) => {
          // Special handling for the "More" menu
          if (path === '#more') {
            return (
              <Sheet key="more-menu" open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
                <SheetTrigger asChild>
                  <button className={cn(
                    'flex flex-col items-center py-2 px-1 w-full',
                    'text-muted-foreground'
                  )}>
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] mt-1 font-medium">{label}</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[40vh] pb-safe">
                  <div className="space-y-4 pt-4">
                    <div className="flex flex-col space-y-1">
                      <NavLink 
                        to="/profile" 
                        className={({isActive}) => cn(
                          "flex items-center p-2 rounded-md",
                          isActive ? "bg-accent" : "hover:bg-muted"
                        )}
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        <User className="mr-2 h-5 w-5" />
                        <span>Profile</span>
                      </NavLink>
                      
                      {/* Admin link */}
                      {isAdmin && (
                        <NavLink 
                          to="/admin" 
                          className={({isActive}) => cn(
                            "flex items-center p-2 rounded-md",
                            isActive ? "bg-accent" : "hover:bg-muted"
                          )}
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          <Shield className="mr-2 h-5 w-5" />
                          <span>Admin</span>
                        </NavLink>
                      )}
                      
                      {/* CEO link */}
                      {isCeo && (
                        <NavLink 
                          to="/ceo-portal" 
                          className={({isActive}) => cn(
                            "flex items-center p-2 rounded-md",
                            "bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 bg-clip-text text-transparent",
                            isActive ? "font-bold" : ""
                          )}
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          <Shield className="mr-2 h-5 w-5 text-amber-500" />
                          <span>CEO Portal</span>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            );
          }
          
          const isActive = 
            path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(path);
          
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => cn(
                'flex flex-col items-center py-2 px-1 relative',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 h-0.5 w-12 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] mt-1 font-medium">{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNavigation;
