
import { useAdminStatus } from '@/hooks/useAdminStatus';

export function useCeoStatus() {
  // Use the centralized useAdminStatus hook
  const { isCeo } = useAdminStatus();

  return {
    isCeo
  };
}
