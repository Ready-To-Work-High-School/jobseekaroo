
import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface NetworkStatusIndicatorProps {
  isOnline: boolean;
}

const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({ isOnline }) => {
  const { refreshData, lastOnlineAt } = useNetworkStatus();
  
  const handleRefreshClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Manual refresh triggered');
    refreshData();
  };
  
  const lastUpdateTime = lastOnlineAt 
    ? new Date(lastOnlineAt).toLocaleTimeString() 
    : 'never';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
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
            
            <button 
              onClick={handleRefreshClick}
              className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Refresh data"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isOnline 
            ? `Online - Last updated: ${lastUpdateTime}` 
            : 'Offline - Check your connection'
          }
          <div className="text-xs mt-1">Click refresh icon to update data</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NetworkStatusIndicator;
