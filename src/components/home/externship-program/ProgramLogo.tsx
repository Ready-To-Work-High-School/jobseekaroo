
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
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      <div className="relative">
        {/* Glow effect behind the logo */}
        <motion.div 
          className="absolute inset-0 bg-green-200/50 blur-xl rounded-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>
        
        <img 
          src={logoSrc} 
          alt={alt} 
          className="rounded-lg shadow-md w-full h-auto relative z-10 bg-white p-2"
        />
      </div>
    </motion.div>
  );
};

export default ProgramLogo;
