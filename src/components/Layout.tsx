
import React from 'react';
import AppHeader from './app/AppHeader';
import Footer from './layout/Footer';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import FloatingBackButton from './common/FloatingBackButton';
import MobileBottomNav from './mobile/MobileBottomNav';
import { motion } from 'framer-motion';
import WhatYouGetCTA from './auth/WhatYouGetCTA';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/sign-in', '/signin', '/signup', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'].includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-white">
      {/* Single ErrorBoundary that wraps the entire layout */}
      <ErrorBoundary>
        <AppHeader />
        
        <motion.main 
          className="flex-grow pb-16 md:pb-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {!isHomePage && (
            <FloatingBackButton />
          )}
          
          {children}

          {/* Add the What You Get CTA to all non-auth pages */}
          {!isAuthPage && (
            <div className="container mx-auto px-4 mb-8 what-you-get-cta-container">
              <WhatYouGetCTA />
            </div>
          )}
        </motion.main>
        
        <Footer />
        
        {/* Only show mobile navigation on non-auth pages */}
        {!isAuthPage && (
          <MobileBottomNav />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
