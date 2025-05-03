
interface SystemStatus {
  networkStatus: boolean;
  authStatus: boolean;
  dataStatus: boolean;
}

export const getSystemStatus = (): SystemStatus => {
  // Check network connectivity
  const networkStatus = navigator.onLine;
  
  // For auth status, we check localStorage/sessionStorage for tokens
  // This is a simplified check - in a real app, you'd verify the token
  const authStatus = Boolean(
    localStorage.getItem('token') || 
    sessionStorage.getItem('token') || 
    document.cookie.includes('auth=')
  );
  
  // For data status, we'd normally check API endpoints
  // Here we'll just assume it's available if network is available
  const dataStatus = networkStatus;
  
  return {
    networkStatus,
    authStatus,
    dataStatus
  };
};

export const formatDiagnosticMessage = (
  status: SystemStatus, 
  issues: string[]
): string => {
  if (issues.length === 0) {
    return "All systems are functioning correctly.";
  }
  
  const statusSummary = [
    `Network: ${status.networkStatus ? "✅ Online" : "❌ Offline"}`,
    `Auth: ${status.authStatus ? "✅ Available" : "❌ Unavailable"}`,
    `Data: ${status.dataStatus ? "✅ Accessible" : "❌ Inaccessible"}`
  ].join(", ");
  
  return `${statusSummary}. Found ${issues.length} issue(s): ${issues.join("; ")}`;
};
