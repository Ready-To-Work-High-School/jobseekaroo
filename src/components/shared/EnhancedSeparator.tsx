
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedSeparatorProps {
  className?: string;
}

const EnhancedSeparator = ({ className }: EnhancedSeparatorProps) => {
  return (
    <div className={cn("my-8 flex items-center justify-center gap-2", className)}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-800/20 to-transparent" />
      <div className="h-2 w-2 rounded-full bg-red-800/20 animate-pulse-slow" />
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-800/20 to-transparent" />
    </div>
  );
};

export default EnhancedSeparator;
