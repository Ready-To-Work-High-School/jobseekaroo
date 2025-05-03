
interface SystemStatus {
  networkStatus: boolean;
  authStatus: boolean;
  dataStatus: boolean;
}

export const getSystemStatus = (): SystemStatus => {
  return {
    networkStatus: navigator.onLine,
    authStatus: true,  // Simplified - would normally check auth status
    dataStatus: true   // Simplified - would check data availability
  };
};

export const formatDiagnosticMessage = (
  status: SystemStatus, 
  issues: string[]
): string => {
  if (issues.length === 0) {
    return "All systems are functioning correctly.";
  }
  
  return `Found ${issues.length} issue(s): ${issues.join(", ")}`;
};
