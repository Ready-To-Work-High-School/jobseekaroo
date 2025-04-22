
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
import { commonIssues } from './troubleshootingData';

// Define minimal types needed for the component
interface TroubleshootProps {
  trigger?: React.ReactNode;
  initialIssue?: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  solution: string;
}

const TroubleshootDialog = ({ trigger, initialIssue }: TroubleshootProps) => {
  const [selectedIssue, setSelectedIssue] = useState(initialIssue || '');
  const [isChecking, setIsChecking] = useState(false);
  
  const handleDiagnostics = async () => {
    setIsChecking(true);
    // Simulate diagnostics check
    setTimeout(() => {
      setIsChecking(false);
    }, 1500);
  };

  // Fallback data if commonIssues is not defined
  const issues: Issue[] = commonIssues || [
    {
      id: 'login',
      title: 'Login Issues',
      description: 'Having trouble signing in to your account?',
      solution: 'Check your email and password, or try resetting your password.'
    },
    {
      id: 'jobs',
      title: 'Jobs Not Loading',
      description: 'Issues with viewing or applying to jobs?',
      solution: 'Try refreshing the page or clearing your browser cache.'
    }
  ];

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
          <Button 
            onClick={handleDiagnostics}
            disabled={isChecking}
            className="w-full"
          >
            {isChecking ? 'Running Diagnostics...' : 'Run System Check'}
          </Button>

          <Separator />

          <div className="space-y-4">
            {issues.map((issue) => (
              <div 
                key={issue.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedIssue === issue.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedIssue(issue.id)}
              >
                <h3 className="font-medium">{issue.title}</h3>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
                
                {selectedIssue === issue.id && (
                  <div className="mt-4 p-3 bg-muted/70 rounded-md">
                    <p className="text-sm font-medium">Solution:</p>
                    <p className="text-sm">{issue.solution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TroubleshootDialog;
