
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
        <div className="p-1">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500 animate-pulse" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {isOnline ? "Connected to network" : "You are currently offline"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NetworkStatusIndicator;
