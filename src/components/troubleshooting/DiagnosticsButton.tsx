
import React, { forwardRef } from 'react';
import { Bug, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DiagnosticsButtonProps {
  onRun: () => Promise<void>;
  isChecking: boolean;
}

export const DiagnosticsButton = forwardRef<HTMLButtonElement, DiagnosticsButtonProps>(
  ({ onRun, isChecking }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onRun}
        disabled={isChecking}
        className="w-full"
        variant={isChecking ? "outline" : "default"}
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
  }
);

DiagnosticsButton.displayName = "DiagnosticsButton";
