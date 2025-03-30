
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNavbar from './mobile/MobileNavbar';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  
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
      {children}
      {showNavigation && <MobileNavbar />}
    </div>
  );
};

export default MobileLayout;
