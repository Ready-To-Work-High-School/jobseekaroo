
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkStatusIndicatorProps {
  isOnline: boolean;
  className?: string;
}

const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({ 
  isOnline,
  className 
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      {isOnline ? (
        <Wifi className="h-4 w-4 text-green-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-red-500 animate-pulse" />
      )}
    </div>
  );
};

export default NetworkStatusIndicator;
