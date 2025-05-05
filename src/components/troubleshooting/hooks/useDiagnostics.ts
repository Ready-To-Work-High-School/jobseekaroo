
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { getSystemStatus, formatDiagnosticMessage, SystemStatus } from '../utils/statusChecks';
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
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null);

  /**
   * Run all diagnostic checks and display results
   */
  const handleDiagnostics = useCallback(async () => {
    // Prevent multiple simultaneous checks
    if (isChecking) return;
    
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
      setLastRunTime(new Date());
      
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
      // Always stop checking after a short delay to show progress
      setTimeout(() => setIsChecking(false), 1000);
    }
  }, [isChecking, toast]);

  /**
   * Check if diagnostic issues include a specific issue type
   */
  const hasIssue = useCallback((type: string): boolean => {
    return lastResults.some(issue => issue.toLowerCase().includes(type.toLowerCase()));
  }, [lastResults]);

  return {
    isChecking,
    handleDiagnostics,
    isOnline,
    lastResults,
    latency,
    lastRunTime,
    hasIssue
  };
};
