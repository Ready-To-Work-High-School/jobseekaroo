
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const getSystemStatus = () => {
  const networkStatus = navigator.onLine;
  const authStatus = true; // Replace with actual auth check
  const dataStatus = true; // Replace with actual data access check
  
  return {
    networkStatus,
    authStatus,
    dataStatus
  };
};

export const formatDiagnosticMessage = (status: ReturnType<typeof getSystemStatus>, missingItems: string[]) => {
  return `
    Network: ${status.networkStatus ? "✅" : "❌"}
    Auth: ${status.authStatus ? "✅" : "❌"}
    Data: ${status.dataStatus ? "✅" : "❌"}
    Missing Items: ${missingItems.length > 0 ? missingItems.join(", ") : "None"}
  `;
};
