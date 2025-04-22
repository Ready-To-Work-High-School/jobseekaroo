
import React, { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import FloatingBackButton from './common/FloatingBackButton';
import MobileBottomNav from './mobile/MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    console.log("Layout mounted with pathname:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <Header hideAuthLinks={hideAuthLinks} />
      </ErrorBoundary>
      
      <main className="flex-grow pb-16 md:pb-0">
        <ErrorBoundary>
          {!isHomePage && (
            <FloatingBackButton />
          )}
        </ErrorBoundary>
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MobileBottomNav />
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
