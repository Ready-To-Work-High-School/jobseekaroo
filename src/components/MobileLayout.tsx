
import React, { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavbar from './mobile/MobileNavbar';
import { useAuth } from '@/contexts/AuthContext';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  if (!isMobile) return <>{children}</>;
  
  return (
    <div className="pb-16 mobile-optimized"> {/* Add padding to the bottom to account for the fixed navbar */}
      {children}
      {user && <MobileNavbar />}
    </div>
  );
};

export default MobileLayout;
