
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NetworkStatusContextType {
  isOnline: boolean;
  lastOnlineAt: Date | null;
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  isOnline: navigator.onLine,
  lastOnlineAt: navigator.onLine ? new Date() : null
});

export const useNetworkStatus = () => useContext(NetworkStatusContext);

interface NetworkStatusProviderProps {
  children: ReactNode;
}

export const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
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

  return (
    <NetworkStatusContext.Provider value={{ isOnline, lastOnlineAt }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export default NetworkStatusProvider;
