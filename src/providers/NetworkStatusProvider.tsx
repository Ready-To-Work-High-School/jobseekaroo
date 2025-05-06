
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type NetworkStatusContextType = {
  isOnline: boolean;
  checkConnection: () => Promise<boolean>;
  lastOnlineTime: number | null;
  refreshData: () => void;
};

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  isOnline: true,
  checkConnection: async () => true,
  lastOnlineTime: null,
  refreshData: () => {}
});

export const useNetworkStatusContext = () => useContext(NetworkStatusContext);

interface NetworkStatusProviderProps {
  children: ReactNode;
}

export const NetworkStatusProvider: React.FC<NetworkStatusProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState<number | null>(isOnline ? Date.now() : null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Check if we can actually reach any server
  const checkConnection = async (): Promise<boolean> => {
    try {
      console.log('Checking connection status...');
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const online = response.ok;
      console.log('Connection check result:', online);
      
      if (online !== isOnline) {
        console.log(`Network status changed: ${isOnline ? 'online → offline' : 'offline → online'}`);
      }
      
      setIsOnline(online);
      
      // Update last online time if we're online
      if (online) {
        setLastOnlineTime(Date.now());
      }
      
      return online;
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsOnline(false);
      return false;
    }
  };

  // Function to trigger data refresh in components
  const refreshData = useCallback(() => {
    const now = Date.now();
    setRefreshTrigger(now);
    console.log('Data refresh triggered at:', new Date(now).toISOString(), 'Refresh count:', refreshTrigger + 1);
    document.dispatchEvent(new CustomEvent('app:data-refresh', { detail: { timestamp: now } }));
  }, [refreshTrigger]);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Browser reports online status');
      // When coming back online, we should refresh data
      checkConnection().then(isConnected => {
        if (isConnected) {
          console.log('Connection restored - triggering data refresh');
          refreshData();
        }
      });
    };
    
    const handleOffline = () => {
      console.log('Browser reports offline status');
      setIsOnline(false);
    };
    
    // Initial check
    checkConnection();
    console.log('Initial network status:', isOnline ? 'Online' : 'Offline');
    
    // Set up listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Periodic check (every 30 seconds)
    const intervalId = setInterval(() => {
      checkConnection().then(isConnected => {
        // If we were offline and now we're online, trigger a refresh
        if (isConnected && !isOnline) {
          console.log('Connection restored during periodic check - triggering refresh');
          refreshData();
        }
      });
    }, 30000);
    
    // Check connection and refresh data when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab became visible, checking connection...');
        checkConnection().then(isConnected => {
          if (isConnected) {
            console.log('Tab visible and connected - triggering refresh');
            refreshData();
          }
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [isOnline, refreshData]);

  return (
    <NetworkStatusContext.Provider value={{ 
      isOnline, 
      checkConnection, 
      lastOnlineTime,
      refreshData
    }}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
