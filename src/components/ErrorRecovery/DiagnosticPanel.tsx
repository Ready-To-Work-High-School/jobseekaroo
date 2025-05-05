
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Check, Settings2 } from 'lucide-react';
import { useDiagnosticService } from './diagnosticService';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DiagnosticPanelProps {
  showDetails?: boolean;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ showDetails = false }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ issues: string[]; automaticallyFixed: number } | null>(null);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const { runDiagnostics, applyFixes } = useDiagnosticService();

  const handleRunDiagnostics = async () => {
    setIsRunning(true);
    try {
      const diagnosticResults = await runDiagnostics();
      setResults(diagnosticResults);
      console.log("Diagnostic results:", diagnosticResults);
    } catch (error) {
      console.error("Failed to run diagnostics:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleApplyFixes = async () => {
    if (!results?.issues.length) return;
    
    setIsRunning(true);
    try {
      const fixesApplied = await applyFixes(results.issues);
      
      // Update results to reflect fixes
      setResults(prev => {
        if (!prev) return null;
        return {
          ...prev,
          automaticallyFixed: (prev.automaticallyFixed || 0) + fixesApplied,
          issues: prev.issues.slice(fixesApplied)
        };
      });
    } catch (error) {
      console.error("Failed to apply fixes:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          System Diagnostics
        </CardTitle>
        <CardDescription>
          Check and fix issues with your application
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {showDetails && results && (
          <div className="mb-4 space-y-2">
            {results.issues.length === 0 ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800">All Systems Operational</AlertTitle>
                <AlertDescription className="text-green-700">
                  No issues were detected with your application.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-800">Issues Detected</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Found {results.issues.length} issue(s) that may affect functionality.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-4">
                  <p className="font-medium mb-2">Issues found ({results.issues.length}):</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {(showAllIssues ? results.issues : results.issues.slice(0, 5)).map((issue, index) => (
                      <li key={index} className="text-red-600">{issue}</li>
                    ))}
                  </ul>
                  
                  {results.issues.length > 5 && !showAllIssues && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowAllIssues(true)}
                      className="mt-2 text-sm"
                    >
                      Show all {results.issues.length} issues
                    </Button>
                  )}
                </div>
                
                {results.automaticallyFixed > 0 && (
                  <div className="bg-green-50 p-3 rounded-md text-sm mt-4">
                    {results.automaticallyFixed} issue(s) were automatically fixed
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!showDetails && results && (
          <div className="mb-4 p-3 rounded-md border">
            <div className="flex justify-between items-center">
              <span>Diagnostic complete</span>
              <span className="text-sm font-medium">
                {results.issues.length === 0 ? (
                  <span className="text-green-600">All clear</span>
                ) : (
                  <span className="text-red-600">
                    {results.issues.length} issue(s) found
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleRunDiagnostics} 
          disabled={isRunning}
          variant={results?.issues.length ? "outline" : "default"}
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Settings2 className="mr-2 h-4 w-4" />
              Run Diagnostics
            </>
          )}
        </Button>

        {results?.issues.length > 0 && (
          <Button 
            onClick={handleApplyFixes}
            disabled={isRunning || !results?.issues.length}
            variant="default"
          >
            {isRunning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <AlertCircle className="mr-2 h-4 w-4" />
            )}
            Apply Fixes ({results.issues.length})
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DiagnosticPanel;
