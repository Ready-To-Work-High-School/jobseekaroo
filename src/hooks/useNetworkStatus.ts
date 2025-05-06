
import { useState, useEffect, useCallback } from 'react';

export interface NetworkStatusResult {
  isOnline: boolean;
  refreshData: () => void;
  lastOnlineAt: Date | null;  // Added this property to match usage in components
}

export const useNetworkStatus = (): NetworkStatusResult => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(isOnline ? new Date() : null);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Network is back online');
      setIsOnline(true);
      setLastOnlineAt(new Date());
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
    // Update last online time if we're online
    if (isOnline) {
      setLastOnlineAt(new Date());
    }
    // Dispatch a custom event that other components can listen for
    document.dispatchEvent(new CustomEvent('app:data-refresh'));
  }, [isOnline]);

  return { isOnline, refreshData, lastOnlineAt };
};
