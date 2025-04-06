
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedStarProps {
  size?: number;
  color?: string;
  pulseColor?: string;
}

const AnimatedStar: React.FC<AnimatedStarProps> = ({
  size = 24,
  color = "#F59E0B", // Amber-500
  pulseColor = "rgba(245, 158, 11, 0.5)" // Semi-transparent amber
}) => {
  return (
    <div className="relative">
      {/* Background pulse effect */}
      <motion.div
        className="absolute rounded-full"
        style={{ 
          backgroundColor: pulseColor,
          width: size * 1.5,
          height: size * 1.5,
          top: -size * 0.25,
          left: -size * 0.25,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Star icon with animation */}
      <motion.div
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Star 
          size={size} 
          color={color} 
          fill={color}
          strokeWidth={1.5}
          className="drop-shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedStar;
