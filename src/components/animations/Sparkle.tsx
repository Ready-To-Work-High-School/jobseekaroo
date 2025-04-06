
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SparkleProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Sparkle: React.FC<SparkleProps> = ({ 
  color = "#FFC700", 
  size = 20, 
  top, 
  left, 
  right, 
  bottom 
}) => {
  const [position, setPosition] = useState({
    top: top || `${randomNumber(0, 100)}%`,
    left: left || right ? undefined : `${randomNumber(0, 100)}%`,
    right: right || undefined,
    bottom: bottom || undefined,
  });
  
  const [rotation, setRotation] = useState(randomNumber(0, 360));
  
  useEffect(() => {
    if (!top && !bottom) {
      const interval = setInterval(() => {
        setPosition(prev => ({
          ...prev,
          top: `${randomNumber(0, 100)}%`,
          left: left || right ? undefined : `${randomNumber(0, 100)}%`
        }));
        setRotation(randomNumber(0, 360));
      }, randomNumber(3000, 6000));
      
      return () => clearInterval(interval);
    }
  }, [left, right, top, bottom]);
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        ...position,
        zIndex: 2,
        pointerEvents: 'none',
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0.8, 1], 
        rotate: rotation,
        opacity: [0, 1, 0.8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: randomNumber(1, 3),
      }}
    >
      <path
        d="M12 0L13.96 8.04L22 10L13.96 11.96L12 20L10.04 11.96L2 10L10.04 8.04L12 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

const SparkleGroup: React.FC<{count?: number}> = ({ count = 5 }) => {
  const colors = ["#FFC700", "#FFA500", "#FF6347", "#3B82F6", "#8B5CF6"];
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Sparkle
          key={i}
          color={colors[i % colors.length]}
          size={randomNumber(10, 25)}
        />
      ))}
    </>
  );
};

export { Sparkle, SparkleGroup };
