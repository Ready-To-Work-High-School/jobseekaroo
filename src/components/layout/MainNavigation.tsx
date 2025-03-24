
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const { user, userProfile } = useAuth();
  const location = useLocation();

  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  const isEmployer = userProfile?.user_type === 'employer';
  const isAdmin = userProfile?.user_type === 'admin';

  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/' ? 'text-primary' : 'text-foreground')}>
        Home
      </Link>
      <Link to={getPath("/jobs")} className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/jobs' ? 'text-primary' : 'text-foreground')}>
        Jobs
      </Link>
      <Link to="/entrepreneurship-academy" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/entrepreneurship-academy' ? 'text-primary' : 'text-foreground')}>
        Academy
      </Link>
      {user ? (
        <>
          <Link to="/applications" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/applications' ? 'text-primary' : 'text-foreground')}>
            Applications
          </Link>
          <Link to="/skills" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/skills' ? 'text-primary' : 'text-foreground')}>
            Skills
          </Link>
          <Link to="/analytics" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/analytics' ? 'text-primary' : 'text-foreground')}>
            Analytics
          </Link>
          <Link to="/account-benefits" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/account-benefits' ? 'text-primary' : 'text-foreground')}>
            Benefits
          </Link>
          {isAdmin && (
            <Link to="/admin/redemption-codes" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/admin/redemption-codes' ? 'text-primary' : 'text-foreground')}>
              Admin
            </Link>
          )}
        </>
      ) : (
        <>
          <Link to="/sign-in" className={cn("text-sm font-medium transition-colors hover:text-primary", 
            location.pathname === '/applications' || location.pathname === '/skills' || location.pathname === '/analytics' ? 'text-primary' : 'text-foreground')}>
            Student Portal
          </Link>
        </>
      )}
      
      {isEmployer ? (
        <Link to="/employer-dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/employer-dashboard' ? 'text-primary' : 'text-foreground')}>
          Employer Dashboard
        </Link>
      ) : (
        <Link to="/for-employers" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/for-employers' ? 'text-primary' : 'text-foreground')}>
          For Employers
        </Link>
      )}
    </nav>
  );
};

export default MainNavigation;
