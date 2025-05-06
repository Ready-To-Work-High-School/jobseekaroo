
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type NetworkStatusContextType = {
  isOnline: boolean;
  checkConnection: () => Promise<boolean>;
};

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  isOnline: true,
  checkConnection: async () => true
});

export const useNetworkStatusContext = () => useContext(NetworkStatusContext);

interface NetworkStatusProviderProps {
  children: ReactNode;
}

export const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Check if we can actually reach any server
  const checkConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const online = response.ok;
      setIsOnline(online);
      return online;
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsOnline(false);
      return false;
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      console.log('Browser reports online status');
      checkConnection();
    };
    
    const handleOffline = () => {
      console.log('Browser reports offline status');
      setIsOnline(false);
    };
    
    // Initial check
    checkConnection();
    
    // Set up listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Periodic check (every 30 seconds)
    const intervalId = setInterval(checkConnection, 30000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={{ isOnline, checkConnection }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
