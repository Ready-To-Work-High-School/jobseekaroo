
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, GraduationCap, Briefcase } from 'lucide-react';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { EmployerDropdown } from './navigation/EmployerDropdown';
import { SchoolDropdown } from './navigation/SchoolDropdown';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Removed debug logs - status changes are now logged only in useAdminStatus hook
  const isActiveLink = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  
  return (
    <nav className={cn("flex gap-6", className)}>
      <Link 
        to="/" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary", 
          isActiveLink("/") && "text-primary"
        )}
      >
        Home
      </Link>
      
      <Link 
        to="/jobs" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary", 
          isActiveLink("/jobs") && "text-primary"
        )}
      >
        Find Jobs
      </Link>
      
      <EmployerDropdown />
      
      <SchoolDropdown />
      
      <ResourcesDropdown />
      
      {/* Show admin link if user is admin */}
      {isAdmin && (
        <Link 
          to="/admin" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1", 
            isActiveLink("/admin") && "text-primary"
          )}
        >
          <Shield className="h-3 w-3" />
          <span>Admin</span>
        </Link>
      )}
      
      {/* Show CEO link if user is CEO */}
      {isCeo && (
        <Link 
          to="/ceo-portal" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
            "bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent", 
            isActiveLink("/ceo-portal") && "font-bold"
          )}
        >
          <Shield className="h-3 w-3 text-amber-500" />
          <span>CEO</span>
        </Link>
      )}
    </nav>
  );
};

export default MainNavigation;
