
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useState } from 'react';
import { getSystemStatus, formatDiagnosticMessage } from './utils/statusChecks';

export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);

  const handleDiagnostics = async () => {
    setIsChecking(true);
    
    try {
      const systemStatus = getSystemStatus();
      
      // Define some basic checks
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

      toast({
        title: "Diagnostic Results",
        description: formatDiagnosticMessage(systemStatus, missingItems)
      });
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
    handleDiagnostics
  };
};
