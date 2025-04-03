
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MainNavigation from './MainNavigation';
import MobileMenu from './MobileMenu';
import AuthLinks from './AuthLinks';
import UserMenu from './UserMenu';
import { NotificationCenter } from '../notifications/NotificationCenter';

const Header = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-secondary border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        {isMobile && (
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            setIsOpen={setIsMobileMenuOpen} 
          />
        )}
        
        <div className="flex items-center space-x-4">
          <MainNavigation className="hidden md:flex" />
        </div>

        <div className="flex items-center space-x-2">
          {user && <NotificationCenter />}
          {user ? <UserMenu /> : <AuthLinks className="hidden md:flex" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
