
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, GraduationCap } from 'lucide-react';
import { useAdminStatus } from '@/hooks/useAdminStatus';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Debug logs - leave these for troubleshooting
  console.log('MainNavigation - user type:', isAdmin ? 'admin' : 'not-admin');
  console.log('MainNavigation - CEO status:', isCeo ? 'CEO' : 'not-CEO');
  
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
      
      <Link 
        to="/for-employers" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary", 
          isActiveLink("/for-employers") && "text-primary"
        )}
      >
        For Employers
      </Link>
      
      <Link 
        to="/school-integration" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1", 
          isActiveLink("/school-integration") && "text-primary"
        )}
      >
        <GraduationCap className="h-4 w-4" />
        <span>Schools</span>
      </Link>
      
      {/* Show admin link if user is admin */}
      {isAdmin && (
        <Link 
          to="/admin" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1", 
            isActiveLink("/admin") && "text-primary"
          )}
        >
          <Shield className="h-4 w-4" />
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
          <Shield className="h-4 w-4 text-amber-500" />
          <span>CEO</span>
        </Link>
      )}
    </nav>
  );
};

export default MainNavigation;
