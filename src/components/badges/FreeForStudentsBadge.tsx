
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FreeForStudentsBadgeProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

const FreeForStudentsBadge = ({ variant = 'default', className }: FreeForStudentsBadgeProps) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // Pulsating glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev === 0 ? 1 : 0));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className={cn(
        "relative inline-flex items-center justify-center",
        "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600",
        "rounded-full shadow-lg overflow-hidden",
        "border border-amber-400",
        "badge-shine-effect badge-highlight",
        variant === 'large' && "px-5 py-1.5 text-base font-bold",
        variant === 'default' && "px-4 py-1 text-sm font-medium",
        variant === 'small' && "px-3 py-0.5 text-xs font-medium",
        className
      )}
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: [0.97, 1.03, 0.97],
        transition: { 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Inner content with animated sparkles */}
      <div className="relative z-10 flex items-center text-white">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mr-1.5"
        >
          <Sparkles className={cn(
            "text-yellow-100",
            variant === 'large' && "h-5 w-5",
            variant === 'default' && "h-4 w-4", 
            variant === 'small' && "h-3 w-3"
          )} />
        </motion.div>
        
        <span className="font-bold text-white">Free for students</span>
      </div>
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Pulsating glow effect */}
      <motion.div 
        className="absolute -inset-1 rounded-full opacity-60 blur-md z-0"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: "linear-gradient(45deg, #f59e0b, #fbbf24, #f59e0b)",
        }}
      />
    </motion.div>
  );
};

export default FreeForStudentsBadge;
