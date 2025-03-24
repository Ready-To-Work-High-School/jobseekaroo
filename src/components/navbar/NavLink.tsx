
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isExternal?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
  onClick,
  isExternal = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const linkClasses = cn(
    "px-3 py-2 text-sm font-medium transition-colors",
    isActive 
      ? "text-blue-900 font-semibold" 
      : "text-gray-600 hover:text-blue-800",
    className
  );

  if (isExternal) {
    return (
      <a 
        href={to}
        className={linkClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className={linkClasses}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
