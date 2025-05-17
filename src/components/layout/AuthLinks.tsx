
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

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
      <Button asChild size="sm" className="h-9 px-4 py-2 text-sm">
        <Link to="/signup" className={cn(
          "inline-flex items-center justify-center",
        )}>
          Sign Up
        </Link>
      </Button>
    </div>
  );
};

export default AuthLinks;
