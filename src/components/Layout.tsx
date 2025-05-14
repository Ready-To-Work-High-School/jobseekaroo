
import React from 'react';
import Footer from './layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import FloatingBackButton from './common/FloatingBackButton';
import MobileBottomNav from './mobile/MobileBottomNav';
import { motion } from 'framer-motion';
import WhatYouGetCTA from './auth/WhatYouGetCTA'; 
import Navbar from './navbar/Navbar'; // Keep only one navbar import

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'].includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-white">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      
      <motion.main 
        className="flex-grow pb-16 md:pb-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <ErrorBoundary>
          {!isHomePage && (
            <FloatingBackButton />
          )}
        </ErrorBoundary>
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>

        {/* Add the What You Get CTA to all non-auth pages */}
        {!isAuthPage && (
          <div className="container mx-auto px-4 mb-8">
            <WhatYouGetCTA />
          </div>
        )}
      </motion.main>
      
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
