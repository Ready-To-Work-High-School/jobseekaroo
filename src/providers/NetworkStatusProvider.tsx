
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface NetworkStatusContextType {
  isOnline: boolean;
  lastOnlineTime: Date | null;
  checkConnection: () => Promise<boolean>;
}

const NetworkStatusContext = createContext<NetworkStatusContextType | undefined>(undefined);

export const useNetworkStatus = (): NetworkStatusContextType => {
  const context = useContext(NetworkStatusContext);
  if (!context) {
    throw new Error('useNetworkStatus must be used within a NetworkStatusProvider');
  }
  return context;
};

interface NetworkStatusProviderProps {
  children: ReactNode;
}

export const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(navigator.onLine ? new Date() : null);
  const [hasShownOfflineToast, setHasShownOfflineToast] = useState<boolean>(false);

  const checkConnection = async (): Promise<boolean> => {
    try {
      // Try to reach a reliable endpoint with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/generate_204', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!isOnline) {
        setIsOnline(true);
        setLastOnlineTime(new Date());
        toast.success("You're back online!");
      }
      
      return true;
    } catch (error) {
      console.error('Connection check failed:', error);
      
      if (isOnline) {
        setIsOnline(false);
        if (!hasShownOfflineToast) {
          toast.error("You appear to be offline. Some features may not work properly.");
          setHasShownOfflineToast(true);
        }
      }
      
      return false;
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
      toast.success("You're back online!");
      setHasShownOfflineToast(false);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (!hasShownOfflineToast) {
        toast.error("You appear to be offline. Some features may not work properly.");
        setHasShownOfflineToast(true);
      }
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    checkConnection();
    
    // Periodic check every 30 seconds
    const intervalId = setInterval(checkConnection, 30000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [isOnline, hasShownOfflineToast]);

  return (
    <NetworkStatusContext.Provider value={{ isOnline, lastOnlineTime, checkConnection }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
