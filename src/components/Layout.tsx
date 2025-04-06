
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingSidebar from '@/components/layout/FloatingSidebar';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';
import BackButton from '@/components/navigation/BackButton';
import { useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideAuthLinks, showBackButton = true }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Don't show back button on the home page
  const shouldShowBackButton = showBackButton && !isHomePage;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-1">
        {shouldShowBackButton && (
          <div className="container mx-auto px-4 pt-4">
            <BackButton />
          </div>
        )}
        {children}
      </main>
      <Footer />
      <FloatingSidebar />
      <AccessibilityMenu />
    </div>
  );
};

export default Layout;
