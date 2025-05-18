
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminTestLinkProps {
  className?: string;
  onClick?: () => void;
  variant?: 'navbar' | 'sidebar' | 'mobile';
}

/**
 * A consistent Admin Test link component that can be used across different menus
 */
const AdminTestLink: React.FC<AdminTestLinkProps> = ({ 
  className, 
  onClick,
  variant = 'navbar'
}) => {
  const location = useLocation();
  const isActive = location.pathname === '/admin' || location.pathname.startsWith('/admin/');
  
  console.log(`AdminTestLink - Current path: ${location.pathname}, Active: ${isActive}`);
  
  // Different styling based on where the link is used
  const baseStyles = "flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 font-bold";
  
  const variantStyles = {
    navbar: "px-3 py-2 text-sm rounded-md",
    sidebar: "px-4 py-2 rounded-md",
    mobile: "px-4 py-3 w-full"
  };
  
  return (
    <Link
      to="/admin"
      className={cn(
        baseStyles,
        variantStyles[variant],
        isActive && "bg-red-700",
        className
      )}
      onClick={onClick}
    >
      <Shield className="h-4 w-4" />
      <span>Admin Panel (Test)</span>
    </Link>
  );
};

export default AdminTestLink;
