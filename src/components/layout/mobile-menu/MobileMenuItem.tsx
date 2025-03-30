
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileMenuItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  activeCheck?: (pathname: string) => boolean;
}

const MobileMenuItem = ({
  to,
  icon: Icon,
  children,
  onClick,
  className,
  activeCheck
}: MobileMenuItemProps) => {
  const location = useLocation();
  
  // Determine if the current route is active
  const isActive = activeCheck 
    ? activeCheck(location.pathname)
    : location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  // Debug logs to help troubleshoot
  console.log(`MobileMenuItem - Path: ${to}, Current: ${location.pathname}, Active: ${isActive}`);

  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 hover:bg-accent rounded-md flex items-center",
        isActive && "bg-accent/70",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3" />
      {children}
    </Link>
  );
};

export default MobileMenuItem;
