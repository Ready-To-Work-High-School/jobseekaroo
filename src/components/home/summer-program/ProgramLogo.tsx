
import React from 'react';
import { motion } from 'framer-motion';

interface ProgramLogoProps {
  logoSrc: string;
  alt: string;
}

const ProgramLogo = ({ logoSrc, alt }: ProgramLogoProps) => {
  return (
    <motion.div
      className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:mr-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Glow effect behind the logo */}
        <motion.div 
          className="absolute inset-0 bg-amber-200/50 blur-xl rounded-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>
        
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 relative z-10">
          <img 
            src={logoSrc}
            alt={alt}
            className="w-full h-auto" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramLogo;
