
import { useAuth } from '@/contexts/AuthContext';
import { SearchBar } from './SearchBar';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const NavbarRight = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <SearchBar />
      
      <ThemeToggle />
      
      {user && (
        <div className="flex items-center">
          <NotificationCenter />
        </div>
      )}
      
      <AuthStatus />
    </div>
  );
};
