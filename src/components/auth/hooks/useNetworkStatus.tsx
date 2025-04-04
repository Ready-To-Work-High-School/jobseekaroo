
import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState({
    isOnline: navigator.onLine,
    connectionType: (navigator as any).connection 
      ? (navigator as any).connection.effectiveType 
      : 'unknown',
    downlink: (navigator as any).connection 
      ? (navigator as any).connection.downlink 
      : null,
    lastChecked: new Date()
  });
  
  const updateNetworkInfo = () => {
    const connection = (navigator as any).connection;
    
    setNetworkState({
      isOnline: navigator.onLine,
      connectionType: connection ? connection.effectiveType : 'unknown',
      downlink: connection ? connection.downlink : null,
      lastChecked: new Date()
    });
  };
  
  useEffect(() => {
    const handleOnline = () => {
      console.log('Network is online');
      updateNetworkInfo();
    };
    
    const handleOffline = () => {
      console.log('Network is offline');
      updateNetworkInfo();
    };
    
    const handleConnectionChange = () => {
      console.log('Connection changed');
      updateNetworkInfo();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }
    
    // Initial check
    updateNetworkInfo();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkState;
};

export default useNetworkStatus;
