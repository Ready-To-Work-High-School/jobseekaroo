
export const getSystemStatus = () => {
  // Check network status directly
  const networkStatus = navigator.onLine;
  
  // These should be actual checks in a real application
  // For this example, we'll implement simple checks
  const authStatus = localStorage.getItem('auth') !== null || sessionStorage.getItem('auth') !== null;
  
  // Check if we can access data services - this is a simple test
  const dataStatus = checkDataEndpoints();
  
  return {
    networkStatus,
    authStatus,
    dataStatus
  };
};

// Simple function to check if common data endpoints are reachable
const checkDataEndpoints = () => {
  // This is a simplified implementation
  // In a real app, you would check specific API endpoints
  try {
    // We can do a basic check if fetch is available
    return typeof fetch === 'function';
  } catch (error) {
    console.error('Data access check failed:', error);
    return false;
  }
};

export const formatDiagnosticMessage = (status: ReturnType<typeof getSystemStatus>, missingItems: string[]) => {
  return `
    System Diagnostics Results:
    
    Network: ${status.networkStatus ? "✅ Connected" : "❌ Offline"}
    Authentication: ${status.authStatus ? "✅ Available" : "❌ Not available"}
    Data Services: ${status.dataStatus ? "✅ Accessible" : "❌ Not accessible"}
    
    ${missingItems.length > 0 ? `Issues detected: ${missingItems.join(", ")}` : "No issues detected! All systems operational."}
  `;
};
