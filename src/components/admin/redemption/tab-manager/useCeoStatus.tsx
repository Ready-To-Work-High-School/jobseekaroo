
import { useAdminStatus } from '@/hooks/useAdminStatus';

export function useCeoStatus() {
  // Use the centralized useAdminStatus hook
  // This ensures consistency across the application
  const { isCeo } = useAdminStatus();

  return {
    isCeo
  };
}
