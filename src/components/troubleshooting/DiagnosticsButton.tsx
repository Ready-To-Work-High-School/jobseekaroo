
import React from 'react';
import { Button } from "@/components/ui/button";
import { Scanner, Loader2 } from 'lucide-react';

interface DiagnosticsButtonProps {
  onRun: () => void;
  isChecking: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export const DiagnosticsButton = React.forwardRef<HTMLButtonElement, DiagnosticsButtonProps>(
  ({ onRun, isChecking, variant = "outline" }, ref) => {
    return (
      <Button 
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onRun();
        }} 
        variant={variant}
        disabled={isChecking}
        className="flex items-center gap-2"
      >
        {isChecking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Scanner className="h-4 w-4" />
        )}
        Run System Diagnostics
      </Button>
    );
  }
);

DiagnosticsButton.displayName = "DiagnosticsButton";
