
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface JS4HSBadgeProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

const JobSeekers4HSBadge = ({ variant = 'default', className = '' }: JS4HSBadgeProps) => {
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 100 }
    }
  };

  const iconVariants = {
    hidden: { rotate: -10 },
    visible: { 
      rotate: 0,
      transition: { 
        yoyo: 3,
        duration: 0.5 
      }
    },
    hover: { 
      rotate: [0, -10, 0, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const sizeClasses = {
    small: 'py-1 px-2 text-xs',
    default: 'py-1.5 px-3 text-sm',
    large: 'py-2 px-4 text-base'
  };

  return (
    <motion.div
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium shadow-sm ${sizeClasses[variant]} ${className}`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={badgeVariants}
    >
      <motion.div 
        className="mr-1.5" 
        variants={iconVariants}
      >
        <GraduationCap className="h-4 w-4" />
      </motion.div>
      <span>Job Seekers 4 HS</span>
    </motion.div>
  );
};

export default JobSeekers4HSBadge;
