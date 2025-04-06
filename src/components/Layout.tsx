
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingSidebar from '@/components/layout/FloatingSidebar';
import { AccessibilityMenu } from '@/components/AccessibilityMenu';

export interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideAuthLinks, showBackButton }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-1">
        {showBackButton && (
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

// Import needed for the BackButton
import BackButton from '@/components/navigation/BackButton';

export default Layout;
