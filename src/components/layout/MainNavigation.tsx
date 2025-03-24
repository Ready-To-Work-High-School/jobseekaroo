
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const { user, userProfile } = useAuth();
  const isAdmin = userProfile?.user_type === 'admin';

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Home
      </Link>
      {user && (
        <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
          Dashboard
        </Link>
      )}
      <Link to="/jobs" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Find Jobs
      </Link>
      {user ? (
        <>
          <Link to="/skills" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Skills
          </Link>
          <Link to="/applications" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Applications
          </Link>
          <Link to="/resume" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Resume
          </Link>
          <Link to="/messages" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Messages
          </Link>
          {isAdmin && (
            <Link to="/admin/message-moderation" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-primary">
              Moderation
            </Link>
          )}
        </>
      ) : (
        <Link to="/resources" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
          Resources
        </Link>
      )}
      <Link to="/entrepreneurship-academy" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Academy
      </Link>
    </nav>
  );
};

export default MainNavigation;
