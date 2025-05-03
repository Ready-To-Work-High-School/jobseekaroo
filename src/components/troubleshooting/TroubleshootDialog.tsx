
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { commonIssues } from './troubleshootingData';
import { DiagnosticsButton } from './DiagnosticsButton';
import { useDiagnostics } from './useDiagnostics';
import { DiagnosticPanel } from '../ErrorRecovery/DiagnosticPanel';
import { IssueItem } from './IssueItem';

// Define minimal types needed for the component
interface TroubleshootProps {
  trigger?: React.ReactNode;
  initialIssue?: string;
}

const TroubleshootDialog = ({ trigger, initialIssue }: TroubleshootProps) => {
  const [selectedIssue, setSelectedIssue] = useState(initialIssue || '');
  const { isChecking, handleDiagnostics } = useDiagnostics();
  
  return (
    <Dialog>
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
          {/* Upgraded to use our DiagnosticPanel */}
          <DiagnosticPanel showDetails={false} />

          <Separator />

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
