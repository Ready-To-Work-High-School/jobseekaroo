
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { runSystemDiagnostics } from './services/diagnosticsService';
import { useDiagnosticState } from './hooks/useDiagnosticState';
import { getSystemStatus, formatDiagnosticMessage } from './utils/statusChecks';

export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const { isChecking, startChecking, stopChecking } = useDiagnosticState();

  const handleDiagnostics = async () => {
    startChecking();
    try {
      const systemStatus = getSystemStatus();
      const missingItems = runSystemDiagnostics();

      toast({
        title: "Diagnostic Results",
        description: formatDiagnosticMessage(systemStatus, missingItems)
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again later.",
      });
    } finally {
      stopChecking();
    }
  };

  return {
    isChecking,
    handleDiagnostics
  };
};
