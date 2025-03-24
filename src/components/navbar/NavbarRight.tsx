
import { useAuth } from '@/contexts/AuthContext';
import { SearchBar } from './SearchBar';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NavbarRight = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <SearchBar />
      
      <ThemeToggle />
      
      {user ? (
        <div className="flex items-center">
          <NotificationCenter />
        </div>
      ) : (
        // Add a prominent sign-in button for non-logged in users
        <Button variant="default" size="sm" asChild className="hidden sm:flex">
          <Link to="/sign-in">Sign In</Link>
        </Button>
      )}
      
      <AuthStatus />
    </div>
  );
};
