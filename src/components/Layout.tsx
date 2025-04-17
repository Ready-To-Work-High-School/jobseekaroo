
import React, { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BackButton from './navigation/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  console.log("Layout rendering, isHomePage:", isHomePage);
  
  useEffect(() => {
    console.log("Layout mounted with pathname:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <Header hideAuthLinks={hideAuthLinks} />
      </ErrorBoundary>
      
      <main className="flex-grow">
        <ErrorBoundary>
          {!isHomePage && (
            <div className="container mx-auto px-4 py-4">
              <BackButton />
            </div>
          )}
        </ErrorBoundary>
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
