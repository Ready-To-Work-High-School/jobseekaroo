
import React from 'react';
import MainNavigation from './MainNavigation';
import AuthLinks from './AuthLinks';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  hideAuthLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthLinks }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <MainNavigation />
        <div className="flex items-center gap-4">
          {!hideAuthLinks && <AuthLinks />}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
