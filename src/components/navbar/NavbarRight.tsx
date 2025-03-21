
import { useAuth } from '@/contexts/AuthContext';
import { SearchBar } from './SearchBar';
import { NotificationCenter } from '@/components/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';

export const NavbarRight = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <SearchBar />
      
      {user && (
        <div className="flex items-center">
          <NotificationCenter />
        </div>
      )}
      
      <AuthStatus />
    </div>
  );
};
