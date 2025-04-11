
import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FreeForStudentsBadgeProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

const FreeForStudentsBadge = ({ variant = 'default', className }: FreeForStudentsBadgeProps) => {
  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center",
        "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
        "rounded-full shadow-lg overflow-hidden",
        "border border-amber-400",
        "transition-all duration-300",
        variant === 'large' && "px-5 py-1.5 text-base font-medium",
        variant === 'default' && "px-4 py-1 text-sm font-medium",
        variant === 'small' && "px-3 py-0.5 text-xs font-medium",
        "glow-amber animate-pulse-slow student-glow",
        className
      )}
    >
      <Sparkles className={cn(
        "mr-1.5",
        variant === 'large' && "h-5 w-5",
        variant === 'default' && "h-4 w-4", 
        variant === 'small' && "h-3 w-3"
      )} />
      Free for students
      <div className="absolute -inset-px bg-gradient-to-r from-amber-300/20 to-amber-500/20 animate-pulse-very-slow"></div>
    </div>
  );
};

export default FreeForStudentsBadge;
