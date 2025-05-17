
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Circle, Shield, GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { isAdmin } from '@/utils/adminUtils';
import AuthLinks from '../AuthLinks';
import { useAdminStatus } from '@/hooks/useAdminStatus';

export const NavLinks = () => {
  const location = useLocation();
  const { userProfile, user } = useAuth();
  const { isCeo } = useAdminStatus();
  
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-6 flex-1">
        <Link to={user ? "/" : "/sign-in"} className={cn("text-sm font-medium transition-colors", 
          location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          Your First Job, Made Simple
        </Link>
        
        <Link to={userProfile?.user_type === 'employer' ? "/employer-dashboard" : "/for-employers"} 
          className={cn("text-sm font-medium transition-colors", 
          location.pathname === "/for-employers" || location.pathname === "/employer-dashboard" 
            ? "text-primary" 
            : "text-muted-foreground hover:text-primary")}>
          For Employers
        </Link>
        
        <Link to="/school-integration" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
          location.pathname === "/school-integration" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          <GraduationCap className="w-4 h-4" />
          Schools
        </Link>
        
        <Link to={user ? "/about" : "/sign-in"} className={cn("text-sm font-medium transition-colors", 
          location.pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          About
        </Link>

        {isAdmin(userProfile) && (
          <Link to="/admin" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
            location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
            <Shield className="w-4 h-4" />
            Admin
          </Link>
        )}
        
        {/* Enhanced hidden CEO link with subtle indicator */}
        <Link 
          to="/ceo-portal" 
          className={cn(
            "opacity-10 hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 relative",
            "text-sm font-medium",
            location.pathname === "/ceo-portal" ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
          aria-label="CEO Portal"
        >
          <div className={cn(
            "absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full",
            isCeo ? "bg-amber-400 animate-pulse-slow" : "hidden"
          )}></div>
          <Shield className="w-3 h-3 text-amber-500" />
          <span className="sr-only">CEO Portal</span>
        </Link>
      </div>

      {!user && (
        <div className="flex items-center space-x-2 ml-auto">
          <Link 
            to="/sign-in" 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="text-sm font-medium bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};
