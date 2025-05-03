
import React from 'react';
import { motion } from 'framer-motion';
import ExternshipProgramLabel from './externship-program/ExternshipProgramLabel';
import UrgencyBadge from './externship-program/UrgencyBadge';
import ProgramLogo from './externship-program/ProgramLogo';
import ProgramHeader from './externship-program/ProgramHeader';
import ProgramDescription from './externship-program/ProgramDescription';
import ProgramDetails from './externship-program/ProgramDetails';
import ProgramFeatures from './externship-program/ProgramFeatures';
import ApplyButton from './externship-program/ApplyButton';

const MacquarieExternshipFeature = () => {
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
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl overflow-hidden shadow-lg border border-green-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Program label */}
      <ExternshipProgramLabel />
      
      {/* Urgency badge */}
      <UrgencyBadge daysLeft={14} />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        {/* Macquarie Group Logo */}
        <ProgramLogo 
          logoSrc="/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png" 
          alt="Macquarie Group Logo" 
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

export default MacquarieExternshipFeature;
