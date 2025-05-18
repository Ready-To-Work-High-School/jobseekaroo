
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

/**
 * Component that displays a notification when the user is offline
 */
export function NetworkStatusIndicator() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center gap-2">
      <WifiOff className="h-4 w-4" />
      <span>You are currently offline</span>
    </div>
  );
}

export default NetworkStatusIndicator;
