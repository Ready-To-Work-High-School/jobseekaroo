
import { useNetworkStatusContext } from '@/providers/NetworkStatusProvider';

/**
 * Hook to access the current network status and related utilities
 * @returns {Object} Network status information and utilities
 */
export const useNetworkStatus = () => {
  const { isOnline, lastOnlineTime, refreshData } = useNetworkStatusContext();
  
  return {
    isOnline,
    lastOnlineTime,
    refreshData
  };
};

export default useNetworkStatus;
