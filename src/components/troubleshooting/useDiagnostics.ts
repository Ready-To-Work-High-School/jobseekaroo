
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useState } from 'react';
import { getSystemStatus, formatDiagnosticMessage } from './utils/statusChecks';
import { runSystemDiagnostics } from './services/diagnosticsService';

export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);

  const handleDiagnostics = async () => {
    setIsChecking(true);
    
    try {
      // Get basic system status
      const systemStatus = getSystemStatus();
      
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

      // Run additional diagnostic checks from service, but ensure we don't get false positives
      // since we've fixed the component checker to return empty arrays
      const additionalIssues = runSystemDiagnostics();
      
      // Combine all detected issues
      const allIssues = [...missingItems, ...additionalIssues];
      
      // Show diagnostic results in toast
      toast({
        title: "Diagnostic Results",
        description: formatDiagnosticMessage(systemStatus, allIssues),
        duration: 5000, // Show for 5 seconds
      });
      
      // Log results for debugging
      console.log("Diagnostic completed:", { systemStatus, issues: allIssues });
      
    } catch (error) {
      console.error("Diagnostic error:", error);
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again later.",
      });
    } finally {
      // Always stop checking, even if there was an error
      setTimeout(() => setIsChecking(false), 1000);
    }
  };

  return {
    isChecking,
    handleDiagnostics,
    isOnline
  };
};

