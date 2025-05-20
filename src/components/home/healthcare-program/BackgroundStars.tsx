
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute bg-blue-100 rounded-full opacity-70"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 3 + 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
