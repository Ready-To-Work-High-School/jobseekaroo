
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNavbar from './mobile/MobileNavbar';
import BackButton from './navigation/BackButton';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Only render the mobile navigation on certain paths
  const showNavigation = ![
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/auth/callback'
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage && (
        <div className="px-4 pt-4">
          <BackButton />
        </div>
      )}
      {children}
      {showNavigation && <MobileNavbar />}
    </div>
  );
};

export default MobileLayout;
