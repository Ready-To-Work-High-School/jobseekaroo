
import React from 'react';
import { motion } from 'framer-motion';
import SummerProgramLabel from './summer-program/SummerProgramLabel';
import UrgencyBadge from './externship-program/UrgencyBadge';
import ProgramLogo from './summer-program/ProgramLogo';
import ProgramHeader from './summer-program/ProgramHeader';
import ProgramDescription from './summer-program/ProgramDescription';
import ProgramDetails from './summer-program/ProgramDetails';
import ProgramFeatures from './summer-program/ProgramFeatures';
import ApplyButton from './summer-program/ApplyButton';
import BackgroundStars from './summer-program/BackgroundStars';

const MayoSummerFeature = () => {
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
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-pink-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background stars */}
      <BackgroundStars />
      
      {/* Program label */}
      <SummerProgramLabel />
      
      {/* Urgency badge */}
      <UrgencyBadge daysLeft={21} />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        {/* Mayo Clinic Logo */}
        <ProgramLogo 
          logoSrc="/lovable-uploads/e55c32f3-210d-417c-944a-dbdc67106fa5.png" 
          alt="Mayo Clinic Logo" 
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

export default MayoSummerFeature;
