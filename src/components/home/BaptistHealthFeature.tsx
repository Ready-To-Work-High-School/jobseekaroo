
import React from 'react';
import { motion } from 'framer-motion';
import HealthcareProgramLabel from './healthcare-program/HealthcareProgramLabel';
import UrgencyBadge from './externship-program/UrgencyBadge';
import ProgramHeader from './healthcare-program/ProgramHeader';
import ProgramDescription from './healthcare-program/ProgramDescription';
import ProgramDetails from './healthcare-program/ProgramDetails';
import ProgramFeatures from './healthcare-program/ProgramFeatures';
import ApplyButton from './healthcare-program/ApplyButton';
import BackgroundStars from './healthcare-program/BackgroundStars';

const BaptistHealthFeature = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  return (
    <motion.div 
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-cyan-50 via-white to-indigo-50 rounded-xl overflow-hidden shadow-lg border border-indigo-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background stars */}
      <BackgroundStars />
      
      {/* Program label */}
      <HealthcareProgramLabel />
      
      {/* Urgency badge */}
      <UrgencyBadge daysLeft={30} />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center mb-6 md:mb-0">
          <img 
            src="/lovable-uploads/fa5d62af-3190-44aa-b88c-55ebbc363b88.png"
            alt="Baptist Health Logo" 
            className="w-32 h-auto object-contain md:mr-6"
          />
        </div>
        
        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          {/* Program Header */}
          <ProgramHeader />
          
          {/* Program Description */}
          <ProgramDescription />
          
          {/* Program Details */}
          <ProgramDetails />
          
          {/* Program Features */}
          <ProgramFeatures />
          
          {/* Apply Button */}
          <ApplyButton />
        </div>
      </div>
    </motion.div>
  );
};

export default BaptistHealthFeature;
