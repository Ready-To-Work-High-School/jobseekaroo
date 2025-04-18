
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NetworkStatusIndicatorProps {
  isOnline: boolean;
}

const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({ isOnline }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={`flex items-center justify-center h-6 w-6 rounded-full ${
            isOnline ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {isOnline ? 'Online' : 'Offline - Check your connection'}
      </TooltipContent>
    </Tooltip>
  );
};

export default NetworkStatusIndicator;
