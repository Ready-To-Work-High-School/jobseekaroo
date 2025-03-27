
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const { user, userProfile } = useAuth();
  const isAdmin = userProfile?.user_type === 'admin';
  const location = useLocation();
  
  // Debug logs
  console.log("MainNavigation - User profile:", userProfile);
  console.log("MainNavigation - Is admin:", isAdmin);
  console.log("MainNavigation - Current path:", location.pathname);

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <Link to="/" className={cn(
        "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
        location.pathname === "/" && "bg-accent/70"
      )}>
        Home
      </Link>
      {user && (
        <Link to="/dashboard" className={cn(
          "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
          location.pathname === "/dashboard" && "bg-accent/70"
        )}>
          Dashboard
        </Link>
      )}
      <Link to="/jobs" className={cn(
        "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
        location.pathname === "/jobs" && "bg-accent/70"
      )}>
        Find Jobs
      </Link>
      <Link to="/for-employers" className={cn(
        "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
        location.pathname === "/for-employers" && "bg-accent/70"
      )}>
        For Employers
      </Link>
      {user ? (
        <>
          <Link to="/skills" className={cn(
            "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
            location.pathname === "/skills" && "bg-accent/70"
          )}>
            Skills
          </Link>
          <Link to="/applications" className={cn(
            "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
            location.pathname === "/applications" && "bg-accent/70"
          )}>
            Applications
          </Link>
          <Link to="/resume" className={cn(
            "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
            location.pathname === "/resume" && "bg-accent/70"
          )}>
            Resume
          </Link>
          <Link to="/messages" className={cn(
            "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
            location.pathname === "/messages" && "bg-accent/70"
          )}>
            Messages
          </Link>
        </>
      ) : (
        <Link to="/resources" className={cn(
          "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
          location.pathname === "/resources" && "bg-accent/70"
        )}>
          Resources
        </Link>
      )}
      <Link to="/entrepreneurship-academy" className={cn(
        "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
        location.pathname === "/entrepreneurship-academy" && "bg-accent/70"
      )}>
        Academy
      </Link>
    </nav>
  );
};

export default MainNavigation;
