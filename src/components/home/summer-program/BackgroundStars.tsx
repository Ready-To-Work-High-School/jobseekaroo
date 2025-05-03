
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const BackgroundStars = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute text-amber-300"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.4,
            zIndex: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          <Star className="h-6 w-6" />
        </motion.div>
      ))}
    </>
  );
};

export default BackgroundStars;
