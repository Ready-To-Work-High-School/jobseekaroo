
import React, { useState } from 'react';
import { AlertTriangle, Bug } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TroubleshootProps } from './types';
import { commonIssues } from './troubleshootingData';
import { DiagnosticsButton } from './DiagnosticsButton';
import { IssueItem } from './IssueItem';
import { useDiagnostics } from './useDiagnostics';

const TroubleshootDialog = ({ trigger, initialIssue }: TroubleshootProps) => {
  const [selectedIssue, setSelectedIssue] = useState(initialIssue);
  const { isChecking, handleDiagnostics } = useDiagnostics();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Bug className="h-4 w-4" />
            Troubleshoot
          </Button>
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
          <DiagnosticsButton 
            onRun={handleDiagnostics}
            isChecking={isChecking}
          />

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
