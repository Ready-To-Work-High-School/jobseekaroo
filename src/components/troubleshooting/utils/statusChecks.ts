
/**
 * System status utilities for checking network, auth, and data availability
 */

export interface SystemStatus {
  networkStatus: boolean;
  authStatus: boolean;
  dataStatus: boolean;
  latency?: number; // Add latency measurement
}

/**
 * Get the current system status
 * @returns SystemStatus object with network, auth, and data status
 */
export const getSystemStatus = async (): Promise<SystemStatus> => {
  // Check network connectivity
  const networkStatus = navigator.onLine;
  
  // For auth status, check localStorage/sessionStorage for tokens
  const authStatus = Boolean(
    localStorage.getItem('token') || 
    sessionStorage.getItem('token') || 
    document.cookie.includes('auth=')
  );
  
  // For data status, we'd normally check API endpoints
  // Here we'll just assume it's available if network is available
  const dataStatus = networkStatus;
  
  // Check network latency by pinging a reliable endpoint
  let latency = undefined;
  if (networkStatus) {
    try {
      const startTime = performance.now();
      // Use a public endpoint that responds quickly
      const response = await fetch('https://www.google.com/generate_204', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      const endTime = performance.now();
      latency = Math.round(endTime - startTime);
    } catch (e) {
      console.error('Error measuring latency:', e);
    }
  }
  
  return {
    networkStatus,
    authStatus,
    dataStatus,
    latency
  };
};

/**
 * Format diagnostic message with system status and issues
 * @param status SystemStatus object
 * @param issues Array of issue messages
 * @returns Formatted message string
 */
export const formatDiagnosticMessage = (
  status: SystemStatus, 
  issues: string[]
): string => {
  // If no issues, return all clear message
  if (issues.length === 0) {
    return "All systems are functioning correctly.";
  }
  
  // Create status summary with emoji indicators
  const statusSummary = [
    `Network: ${status.networkStatus ? "✅ Online" : "❌ Offline"}`,
    `Auth: ${status.authStatus ? "✅ Available" : "❌ Unavailable"}`,
    `Data: ${status.dataStatus ? "✅ Accessible" : "❌ Inaccessible"}`,
    status.latency !== undefined ? `Latency: ${status.latency}ms ${status.latency < 200 ? "✅" : status.latency < 500 ? "⚠️" : "❌"}` : ''
  ].filter(Boolean).join(", ");
  
  // Return combined message with issue count and details
  return `${statusSummary}. Found ${issues.length} issue(s): ${issues.join("; ")}`;
};
