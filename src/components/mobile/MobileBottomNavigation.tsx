
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Briefcase, Building2, GraduationCap, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileMenu } from '@/components/navbar/MobileMenu';

const MobileBottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Skip rendering on auth paths
  if (['/sign-in', '/sign-up', '/forgot-password'].includes(location.pathname) || !user) {
    return null;
  }
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Building2, label: 'Employers', path: '/for-employers' },
    { icon: GraduationCap, label: 'Schools', path: '/school-integration' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50 md:hidden">
      <nav className="grid grid-cols-5">
        {navItems.map(({ icon: Icon, label, path }) => {
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
        
        {/* Menu button for additional navigation */}
        <Sheet>
          <SheetTrigger className={cn(
            'flex flex-col items-center py-2 px-1',
            'text-muted-foreground'
          )}>
            <Menu className="h-5 w-5" />
            <span className="text-[10px] mt-1 font-medium">Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 pt-10 w-[280px]">
            <MobileMenu />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileBottomNavigation;
