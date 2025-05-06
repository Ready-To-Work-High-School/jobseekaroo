
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface NetworkStatusContextType {
  isOnline: boolean;
  lastOnlineAt: Date | null;
  refreshData: () => void;
}

const defaultContext: NetworkStatusContextType = {
  isOnline: true,
  lastOnlineAt: new Date(),
  refreshData: () => {}
};

const NetworkStatusContext = createContext<NetworkStatusContextType>(defaultContext);

export const useNetworkStatusContext = () => useContext(NetworkStatusContext);

export const NetworkStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(isOnline ? new Date() : null);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Network connection established');
      setIsOnline(true);
      setLastOnlineAt(new Date());
    };
    
    const handleOffline = () => {
      console.log('Network connection lost');
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
    console.log('Manual data refresh triggered');
    document.dispatchEvent(new CustomEvent('app:data-refresh'));
  }, []);

  const contextValue = {
    isOnline,
    lastOnlineAt,
    refreshData
  };

  return (
    <NetworkStatusContext.Provider value={contextValue}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
