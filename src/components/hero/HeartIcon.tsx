
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeartIcon = () => {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute -right-12 top-0"
    >
      <Heart 
        className="h-8 w-8"
        style={{
          fill: "url(#heartGradient)",
          stroke: "none"
        }}
      />
      <svg width="0" height="0">
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#9333EA' }} />
            <stop offset="33%" style={{ stopColor: '#3B82F6' }} />
            <stop offset="66%" style={{ stopColor: '#EF4444' }} />
            <stop offset="100%" style={{ stopColor: '#F59E0B' }} />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
