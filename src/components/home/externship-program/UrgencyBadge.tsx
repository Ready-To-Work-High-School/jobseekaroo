
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const UrgencyBadge = () => {
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="absolute -top-2 -right-20 md:-right-2 z-10"
      animate="pulse"
      variants={pulseVariants}
    >
      <div className="relative">
        <Award className="h-16 w-16 text-green-500 drop-shadow-md" />
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
          APPLY<br/>NOW
        </span>
      </div>
    </motion.div>
  );
};

export default UrgencyBadge;
