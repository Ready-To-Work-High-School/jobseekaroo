
import React, { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SignUpPrompt from './auth/SignUpPrompt';
import BackButton from './navigation/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

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
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-grow">
        {!isHomePage && (
          <div className="container mx-auto px-4 py-4">
            <BackButton />
          </div>
        )}
        {children}
      </main>
      {!user && <SignUpPrompt autoDismiss={true} dismissTime={3000} />}
      <Footer />
    </div>
  );
};

export default Layout;
