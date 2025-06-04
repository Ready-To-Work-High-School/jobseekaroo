
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface InceptionBadgeProps {
  variant?: 'compact' | 'full';
  className?: string;
}

const InceptionBadge: React.FC<InceptionBadgeProps> = ({ 
  variant = 'full',
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={className}
      >
        <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-1 text-sm font-medium">
          <Award className="h-3.5 w-3.5 mr-1.5" />
          Founding Member
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={className}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2.5 px-4 shadow-lg font-bold text-center text-lg rounded-md transition-all duration-1000">
        🌟 FOUNDING MEMBER 2025-2026 🌟
      </div>
    </motion.div>
  );
};

export default InceptionBadge;
