
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Briefcase, Book, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();
  
  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Jobs', path: '/jobs' },
    { icon: Book, label: 'Interview', path: '/interview-prep' },
    { icon: Sparkles, label: 'Swipe', path: '/mobile/jobs' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 md:hidden z-50">
      <div className="flex items-center justify-around">
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 relative",
              )}
            >
              <motion.div 
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center justify-center",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-2 w-1/2 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon 
                  className={cn(
                    "h-6 w-6",
                    isActive 
                      ? "text-primary" 
                      : "text-gray-500 dark:text-gray-400"
                  )} 
                />
                <span className={cn(
                  "text-xs mt-1",
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
