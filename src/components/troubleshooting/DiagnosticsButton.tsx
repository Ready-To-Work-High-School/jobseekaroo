
import React from 'react';
import { Bug, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DiagnosticsButtonProps {
  onRun: () => Promise<void>;
  isChecking: boolean;
}

export const DiagnosticsButton = ({ onRun, isChecking }: DiagnosticsButtonProps) => {
  return (
    <Button
      onClick={onRun}
      disabled={isChecking}
      className="w-full"
    >
      {isChecking ? (
        <>
          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          Running Diagnostics...
        </>
      ) : (
        <>
          <Bug className="mr-2 h-4 w-4" />
          Run System Check
        </>
      )}
    </Button>
  );
};
