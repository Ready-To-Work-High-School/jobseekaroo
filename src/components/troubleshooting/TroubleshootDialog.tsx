
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DiagnosticsButton } from './DiagnosticsButton';
import { useDiagnostics } from './hooks/useDiagnostics';
import { DiagnosticPanel } from '../ErrorRecovery/DiagnosticPanel';
import { IssueItem } from './IssueItem';

// Import from consolidated data file
import { commonIssues } from './data/troubleshootingData';

// Define minimal types needed for the component
interface TroubleshootProps {
  trigger?: React.ReactNode;
  initialIssue?: string;
}

const TroubleshootDialog = ({ trigger, initialIssue }: TroubleshootProps) => {
  const [selectedIssue, setSelectedIssue] = useState(initialIssue || '');
  const [open, setOpen] = useState(false);
  const { isChecking, handleDiagnostics, lastResults, latency } = useDiagnostics();
  
  // Run diagnostics when dialog opens if there's no trigger
  useEffect(() => {
    if (open && !trigger) {
      handleDiagnostics();
    }
  }, [open, trigger, handleDiagnostics]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <DiagnosticsButton
            onRun={handleDiagnostics}
            isChecking={isChecking}
          />
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Troubleshooting Assistant
          </DialogTitle>
          <DialogDescription>
            Let's help you identify and resolve any issues you're experiencing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Run diagnostics button at the top */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              {latency !== null && (
                <div className="flex items-center gap-1 text-sm">
                  <Wifi className={`h-4 w-4 ${latency < 200 ? 'text-green-500' : latency < 500 ? 'text-yellow-500' : 'text-red-500'}`} />
                  <span className={`${latency < 200 ? 'text-green-600' : latency < 500 ? 'text-yellow-600' : 'text-red-600'}`}>
                    Network latency: {latency}ms {latency < 200 ? '(good)' : latency < 500 ? '(moderate)' : '(slow)'}
                  </span>
                </div>
              )}
            </div>
            <DiagnosticsButton 
              onRun={handleDiagnostics}
              isChecking={isChecking}
              variant="default"
            />
          </div>
          
          {/* Diagnostic panel shows results */}
          <DiagnosticPanel showDetails={false} />

          <Separator />

          {/* If diagnostic found issues, show them first */}
          {lastResults && lastResults.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
              <h3 className="font-medium text-amber-800 mb-2">Diagnostic Results</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700">
                {lastResults.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            {commonIssues.map((issue) => (
              <IssueItem
                key={issue.id}
                issue={issue}
                isSelected={selectedIssue === issue.id}
                onSelect={setSelectedIssue}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TroubleshootDialog;
