
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MainNavigation from './MainNavigation';
import MobileMenu from './MobileMenu';
import AuthLinks from './AuthLinks';
import UserMenu from './UserMenu';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps = {}) => {
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
          <Link to="/" className="mr-4 hidden sm:block">
            {/* Added blue-gold gradient glow around logo */}
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
              <img 
                src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
                alt="JS4HS Logo" 
                className="h-10 w-10 relative z-10"
              />
            </div>
          </Link>
          <MainNavigation />
        </div>

        <div className="flex items-center space-x-2">
          {user && <NotificationCenter />}
          {user ? <UserMenu /> : <AuthLinks />}
        </div>
      </div>
    </header>
  );
};

export default Header;
