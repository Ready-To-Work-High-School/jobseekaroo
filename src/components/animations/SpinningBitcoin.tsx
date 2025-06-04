
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';

interface SpinningBitcoinProps {
  size?: number;
  duration?: number;
  color?: string;
  showLock?: boolean;
  onAnimationComplete?: () => void;
  className?: string;
}

const SpinningBitcoin: React.FC<SpinningBitcoinProps> = ({
  size = 64,
  duration = 1.5,
  color = "text-amber-500",
  showLock = true,
  onAnimationComplete,
  className
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Handle the animation completion
  useEffect(() => {
    if (unlocked && onAnimationComplete) {
      console.log('Logo animation completed, calling onAnimationComplete callback');
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [unlocked, onAnimationComplete]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* The spinning JS4HS logo */}
      <motion.div
        initial={{ rotateY: 0, scale: 1 }}
        animate={{ 
          rotateY: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: duration,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: 2,
        }}
        onAnimationComplete={() => {
          console.log('Logo spin animation completed');
          setUnlocked(true);
        }}
        className="relative z-10"
      >
        {!imageError ? (
          <img 
            src="/lovable-uploads/87366ebd-ac00-4f9c-b742-0a3330f31904.png" 
            alt="Job Seekers 4 High Schools Logo" 
            width={size}
            height={size}
            className="object-contain drop-shadow-lg"
            onError={() => {
              console.log('Image failed to load, showing fallback');
              setImageError(true);
            }}
          />
        ) : (
          <div className={cn("flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg", color)}>
            <Award 
              size={size * 0.6} 
              className="text-white"
            />
          </div>
        )}
      </motion.div>
      
      {/* The lock/unlock icon */}
      {showLock && (
        <motion.div 
          className="absolute"
          initial={{ opacity: 1, y: size * 0.3 }}
          animate={unlocked ? 
            { opacity: 0, y: size * 0.5, scale: 0.8 } : 
            { opacity: 1, y: size * 0.3, scale: 1 }
          }
          transition={{ duration: 0.4, delay: unlocked ? 0 : duration * 2 }}
        >
          <div className={`p-1 rounded-full bg-white/80 shadow-md ${unlocked ? 'text-green-500' : 'text-amber-600'}`}>
            {unlocked ? (
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={size * 0.4} 
                height={size * 0.4} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -15, 15, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <path d="M12 16v-3" />
              </motion.svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={size * 0.4} 
                height={size * 0.4} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpinningBitcoin;
