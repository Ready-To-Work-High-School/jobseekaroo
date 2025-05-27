
import React from 'react';
import Footer from './layout/Footer';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import FloatingBackButton from './common/FloatingBackButton';
import MobileBottomNav from './mobile/MobileBottomNav';
import { motion } from 'framer-motion';
import WhatYouGetCTA from './auth/WhatYouGetCTA';
import Header from './layout/Header';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/sign-in', '/signin', '/signup', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'].includes(location.pathname);
  const isSchoolIntegrationPage = location.pathname === '/school-integration';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-white">
      {/* Outer ErrorBoundary to ensure something always renders */}
      <ErrorBoundary 
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">We're having trouble loading the application. Please try again later.</p>
            <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Refresh Page
            </a>
          </div>
        }
      >
        {/* Inner ErrorBoundary for the main content */}
        <ErrorBoundary>
          <Header hideAuthLinks={hideAuthLinks} />
          
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

            {/* Add the What You Get CTA to all non-auth pages except school integration */}
            {!isAuthPage && !isSchoolIntegrationPage && (
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
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
