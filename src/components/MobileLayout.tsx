
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileBottomNavigation from './mobile/MobileBottomNavigation';
import BackButton from './navigation/BackButton';
import BackToTopButton from './navigation/BackToTopButton';
import UserOnboardingGuide from './onboarding/UserOnboardingGuide';
import ProminentLogo from './common/ProminentLogo';
import { motion, AnimatePresence } from 'framer-motion';
import JobSeekers4HSBadge from './badges/JobSeekers4HSBadge';
import FreeForStudentsBadge from './badges/FreeForStudentsBadge';
import WhatYouGetCTA from './auth/WhatYouGetCTA';
import Navbar from './navbar/Navbar';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = [
    '/sign-in',
    '/signin',
    '/signup',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/auth/callback'
  ].includes(location.pathname);
  const [scrollY, setScrollY] = useState(0);
  
  // Add body class for mobile layout
  useEffect(() => {
    document.body.classList.add('mobile-layout');
    
    // Fix for horizontal scrolling
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    
    return () => {
      document.body.classList.remove('mobile-layout');
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.body.style.width = '';
    };
  }, []);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Mobile Navbar - Always visible */}
      <Navbar />
      
      {/* Badge at the top */}
      <motion.div
        className="flex justify-center py-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <JobSeekers4HSBadge variant="default" className="badge-pop" />
      </motion.div>
      
      {/* Prominent Logo */}
      <motion.div 
        className="py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <ProminentLogo className="px-4" />
      </motion.div>
      
      {/* Free for students badge */}
      <motion.div 
        className="flex justify-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FreeForStudentsBadge variant="default" />
      </motion.div>
      
      {!isHomePage && !isAuthPage && (
        <div className={`sticky top-16 z-40 bg-white/80 backdrop-blur-md px-4 pt-4 pb-2 transition-shadow ${
          scrollY > 10 ? 'shadow-md' : ''
        }`}>
          <BackButton />
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-1 main-content overflow-x-auto pb-20 pt-2"
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {children}
          
          {/* Add the What You Get CTA to all non-auth pages */}
          {!isAuthPage && (
            <div className="px-4">
              <WhatYouGetCTA />
            </div>
          )}
        </motion.main>
      </AnimatePresence>
      
      <BackToTopButton />
      <MobileBottomNavigation />
      <UserOnboardingGuide />
    </div>
  );
};

export default MobileLayout;
