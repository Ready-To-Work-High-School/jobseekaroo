
import React from 'react';
import { motion } from 'framer-motion';

interface UrgencyBadgeProps {
  daysLeft: number;
}

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ daysLeft }) => {
  return (
    <motion.div 
      className="absolute top-4 right-4 md:top-6 md:right-6 z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
        <svg className="w-3 h-3 text-amber-600 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
        </svg>
        <span>{daysLeft} days left to apply</span>
      </div>
    </motion.div>
  );
};

export default UrgencyBadge;
