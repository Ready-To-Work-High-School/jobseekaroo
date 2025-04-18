
import React, { useState } from 'react';
import { AlertTriangle, Bug, RefreshCcw, WifiOff, Globe, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface TroubleshootProps {
  trigger?: React.ReactNode;
  initialIssue?: string;
}

const TroubleshootDialog = ({ trigger, initialIssue }: TroubleshootProps) => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(initialIssue);

  const commonIssues = [
    {
      id: 'network',
      title: 'Connection Issues',
      icon: WifiOff,
      description: 'Problems with loading data or connecting to services',
      solutions: [
        'Check your internet connection',
        'Ensure you\'re not in airplane mode',
        'Try refreshing the page'
      ]
    },
    {
      id: 'auth',
      title: 'Sign In Problems',
      icon: Globe,
      description: 'Issues with logging in or accessing your account',
      solutions: [
        'Clear your browser cookies',
        'Try using a different browser',
        'Check if third-party cookies are enabled',
        'Ensure you\'re using the correct email'
      ]
    },
    {
      id: 'data',
      title: 'Missing Data',
      icon: Search,
      description: 'Content not appearing or loading correctly',
      solutions: [
        'Refresh the page',
        'Clear your browser cache',
        'Try signing out and back in',
        'Check if you have the necessary permissions'
      ]
    }
  ];

  const handleDiagnostics = async () => {
    setIsChecking(true);
    try {
      // Network connectivity check
      const networkStatus = await checkConnectivity();
      
      // Authentication check
      const authStatus = await checkAuthStatus();
      
      // Data access check
      const dataStatus = await checkDataAccess();
      
      // Show diagnostic results
      toast({
        title: "Diagnostic Results",
        description: `Network: ${networkStatus ? "✅" : "❌"}\nAuth: ${authStatus ? "✅" : "❌"}\nData: ${dataStatus ? "✅" : "❌"}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Simulate diagnostic checks (replace with real implementations)
  const checkConnectivity = async () => {
    return isOnline;
  };

  const checkAuthStatus = async () => {
    return true; // Replace with actual auth check
  };

  const checkDataAccess = async () => {
    return true; // Replace with actual data access check
  };

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

          <Separator />

          <div className="space-y-4">
            {commonIssues.map((issue) => (
              <div
                key={issue.id}
                className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-accent ${
                  selectedIssue === issue.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedIssue(issue.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <issue.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {issue.description}
                    </p>
                    {selectedIssue === issue.id && (
                      <Alert>
                        <AlertDescription>
                          <ul className="list-disc pl-4 space-y-1 text-sm">
                            {issue.solutions.map((solution, index) => (
                              <li key={index}>{solution}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TroubleshootDialog;
