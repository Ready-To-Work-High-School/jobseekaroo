
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface AuthLinksProps {
  className?: string;
}

const AuthLinks = ({ className }: AuthLinksProps) => {
  const { user } = useAuth();
  
  // If user is logged in, don't show auth links
  if (user) return null;
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Link to="/sign-in" className="text-sm font-medium transition-colors hover:text-primary">
        Sign In
      </Link>
      <Link to="/sign-up" className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium transition-colors",
      )}>
        Sign Up
      </Link>
    </div>
  );
};

export default AuthLinks;
