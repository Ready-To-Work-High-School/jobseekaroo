
import { useState, useEffect } from 'react';

export interface NetworkStatusResult {
  isOnline: boolean;
  lastOnlineAt: Date | null;
}

export const useNetworkStatus = (): NetworkStatusResult => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(navigator.onLine ? new Date() : null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineAt(new Date());
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, lastOnlineAt };
};
