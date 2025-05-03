import React from 'react';
import { motion } from 'framer-motion';
import HealthcareProgramLabel from './healthcare-program/HealthcareProgramLabel';
import UrgencyBadge from './healthcare-program/UrgencyBadge';
import BackgroundStars from './healthcare-program/BackgroundStars';
import ProgramLogo from './summer-program/ProgramLogo'; // Reusing this component
import ProgramHeader from './healthcare-program/ProgramHeader';
import ProgramDescription from './healthcare-program/ProgramDescription';
import ProgramDetails from './healthcare-program/ProgramDetails';
import ProgramFeatures from './healthcare-program/ProgramFeatures';
import ApplyButton from './healthcare-program/ApplyButton';

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
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Program label */}
      <HealthcareProgramLabel />
      
      {/* Urgency badge */}
      <UrgencyBadge />
      
      {/* Background stars */}
      <BackgroundStars />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        {/* Baptist Health Logo */}
        <ProgramLogo 
          logoSrc="/lovable-uploads/ffe236ca-51e1-4cd8-a3ff-c40be0234760.png" 
          alt="Baptist Health Logo"
        />
        
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
