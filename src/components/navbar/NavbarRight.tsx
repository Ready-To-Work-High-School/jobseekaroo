
import { useAuth } from '@/contexts/AuthContext';
import { SearchBar } from './SearchBar';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AdminTestLink from '@/components/shared/AdminTestLink';

export const NavbarRight = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <SearchBar />
      
      <ThemeToggle />
      
      {/* Admin Secret Shield Access */}
      <div className="relative mr-1">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
        <div className="relative z-10">
          <AdminTestLink variant="navbar" />
        </div>
      </div>
      
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
