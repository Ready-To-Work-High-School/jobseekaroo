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
        className="absolute left-0 right-0 -top-6 md:-top-5 z-10 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
      >
        <JobSeekers4HSBadge 
          variant={isHomePage ? "large" : "default"}
          className="transform hover:scale-105 transition-transform duration-200"
        />
      </motion.div>
      
      {/* Keep the existing navbar with extra padding for the badge */}
      <div className="pt-6 md:pt-5">
        <Navbar />
      </div>
    </header>
  );
};

export default AppHeader;
