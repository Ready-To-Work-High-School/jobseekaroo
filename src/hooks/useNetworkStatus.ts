
import { useState, useEffect, useCallback } from 'react';

export interface NetworkStatusResult {
  isOnline: boolean;
  refreshData: () => void;
}

export const useNetworkStatus = (): NetworkStatusResult => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Network is back online');
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      console.log('Network is offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Function to manually refresh data or trigger a global refresh
  const refreshData = useCallback(() => {
    console.log('Refreshing data...');
    // Dispatch a custom event that other components can listen for
    document.dispatchEvent(new CustomEvent('app:data-refresh'));
  }, []);

  return { isOnline, refreshData };
};
