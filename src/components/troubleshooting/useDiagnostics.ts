
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { runSystemDiagnostics } from './services/diagnosticsService';

export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);

  const handleDiagnostics = async () => {
    setIsChecking(true);
    try {
      const networkStatus = isOnline;
      const authStatus = true; // Replace with actual auth check
      const dataStatus = true; // Replace with actual data access check
      const missingItems = runSystemDiagnostics();

      toast({
        title: "Diagnostic Results",
        description: `
          Network: ${networkStatus ? "✅" : "❌"}
          Auth: ${authStatus ? "✅" : "❌"}
          Data: ${dataStatus ? "✅" : "❌"}
          Missing Items: ${missingItems.length > 0 ? missingItems.join(", ") : "None"}
        `,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again later.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return {
    isChecking,
    handleDiagnostics
  };
};
