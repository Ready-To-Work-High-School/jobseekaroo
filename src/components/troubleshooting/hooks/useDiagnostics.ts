
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { getSystemStatus, formatDiagnosticMessage } from '../utils/statusChecks';
import { runSystemDiagnostics } from '../services/diagnosticsService';

/**
 * Custom hook for running system diagnostics and managing state
 */
export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);
  const [lastResults, setLastResults] = useState<string[]>([]);
  const [latency, setLatency] = useState<number | null>(null);

  /**
   * Run all diagnostic checks and display results
   */
  const handleDiagnostics = async () => {
    setIsChecking(true);
    
    try {
      // Get basic system status
      const systemStatus = await getSystemStatus();
      
      // Save latency information
      if (systemStatus.latency !== undefined) {
        setLatency(systemStatus.latency);
      }
      
      // Define missing items based on system status
      const missingItems = [];
      
      if (!systemStatus.networkStatus) {
        missingItems.push("Network connection");
      }
      
      if (!systemStatus.authStatus) {
        missingItems.push("Authentication");
      }
      
      if (!systemStatus.dataStatus) {
        missingItems.push("Data access");
      }

      // Run additional diagnostic checks from service
      const additionalIssues = await runSystemDiagnostics();
      
      // Combine all detected issues
      const allIssues = [...missingItems, ...additionalIssues];
      
      // Save results for future reference
      setLastResults(allIssues);
      
      // Show diagnostic results in toast
      toast({
        title: "Diagnostic Results",
        description: formatDiagnosticMessage(systemStatus, allIssues),
        duration: 5000, // Show for 5 seconds
      });
      
      // Log results for debugging
      console.log("Diagnostic completed:", { systemStatus, issues: allIssues });
      
      return {
        status: systemStatus,
        issues: allIssues
      };
    } catch (error) {
      console.error("Diagnostic error:", error);
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again later.",
      });
      return {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error"
      };
    } finally {
      // Always stop checking, even if there was an error
      setTimeout(() => setIsChecking(false), 1000);
    }
  };

  return {
    isChecking,
    handleDiagnostics,
    isOnline,
    lastResults,
    latency
  };
};
