
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import JobSeekers4HSBadge from '../badges/JobSeekers4HSBadge';
import { motion } from 'framer-motion';

const AppHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="w-full relative">
      {/* JS4HS Badge - centered at the top */}
      <motion.div 
        className="absolute left-0 right-0 -top-8 md:-top-7 z-10 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
      >
        <JobSeekers4HSBadge 
          variant={isHomePage ? "large" : "default"}
          className="transform hover:scale-105 transition-transform duration-200 scale-110" // Made logo bigger
        />
      </motion.div>
      
      {/* Single navbar instance */}
      <div className="pt-7 md:pt-6">
        <Navbar />
      </div>
    </header>
  );
};

export default AppHeader;
