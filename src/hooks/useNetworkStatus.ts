
import { useNetworkStatusContext } from '@/providers/NetworkStatusProvider';

/**
 * Hook to access the current network status
 * @returns {boolean} Current online status
 */
export const useNetworkStatus = (): boolean => {
  const { isOnline } = useNetworkStatusContext();
  return isOnline;
};

export default useNetworkStatus;
