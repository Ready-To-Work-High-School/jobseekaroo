
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const Spinner = ({ 
  size = 'md', 
  className,
  color 
}: SpinnerProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 
        className={cn(
          "animate-spin",
          sizeMap[size],
          color ? `text-${color}` : "text-primary"
        )} 
      />
    </div>
  );
};

export default Spinner;
