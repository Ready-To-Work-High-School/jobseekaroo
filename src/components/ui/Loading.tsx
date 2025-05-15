
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const Loading = ({ size = 'md', message, className = '' }: LoadingProps) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-primary`} />
      {message && <p className="mt-2 text-muted-foreground">{message}</p>}
    </div>
  );
};

export default Loading;
