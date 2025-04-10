
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MobileBottomNavigation from './mobile/MobileBottomNavigation';
import BackButton from './navigation/BackButton';
import BackToTopButton from './navigation/BackToTopButton';
import UserOnboardingGuide from './onboarding/UserOnboardingGuide';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'].includes(location.pathname);
  
  // Add body class for mobile layout
  useEffect(() => {
    document.body.classList.add('mobile-layout');
    
    return () => {
      document.body.classList.remove('mobile-layout');
    };
  }, []);
  
  // Handle modals/sheets preventing body scroll
  useEffect(() => {
    const handleSheetToggle = (event: CustomEvent) => {
      if (event.detail.open) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    };
    
    window.addEventListener('sheetStateChange' as any, handleSheetToggle as any);
    
    return () => {
      window.removeEventListener('sheetStateChange' as any, handleSheetToggle as any);
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage && !isAuthPage && (
        <div className="sticky top-0 z-40 bg-background px-4 pt-4 pb-2">
          <BackButton />
        </div>
      )}
      
      <main className="flex-1 main-content">
        {children}
      </main>
      
      <BackToTopButton />
      <MobileBottomNavigation />
      <UserOnboardingGuide />
    </div>
  );
};

export default MobileLayout;
