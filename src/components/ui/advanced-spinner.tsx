
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, LoaderCircle, RefreshCw } from 'lucide-react';

type SpinnerVariant = 'circle' | 'dots' | 'refresh';
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AdvancedSpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  className?: string;
  text?: string;
  centered?: boolean;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const AdvancedSpinner = ({ 
  variant = 'circle', 
  size = 'md', 
  color,
  className,
  text,
  centered = false,
}: AdvancedSpinnerProps) => {
  const renderSpinner = () => {
    const sizeClass = sizeMap[size];
    const colorClass = color ? `text-${color}` : 'text-primary';
    
    switch (variant) {
      case 'refresh':
        return <RefreshCw className={cn("animate-spin", sizeClass, colorClass)} />;
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className={cn(`rounded-full bg-current ${sizeMap.xs} animate-bounce`, colorClass)} style={{ animationDelay: '0ms' }} />
            <div className={cn(`rounded-full bg-current ${sizeMap.xs} animate-bounce`, colorClass)} style={{ animationDelay: '150ms' }} />
            <div className={cn(`rounded-full bg-current ${sizeMap.xs} animate-bounce`, colorClass)} style={{ animationDelay: '300ms' }} />
          </div>
        );
      case 'circle':
      default:
        return <LoaderCircle className={cn("animate-spin", sizeClass, colorClass)} />;
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      centered && "justify-center",
      className
    )}>
      {renderSpinner()}
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  );
};

export default AdvancedSpinner;
