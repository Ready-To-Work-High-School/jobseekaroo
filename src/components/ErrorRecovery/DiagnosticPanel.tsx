
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

interface DiagnosticPanelProps {
  showDetails?: boolean;
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ showDetails = false }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ issues: string[]; automaticallyFixed: number } | null>(null);
  const { runDiagnostics, applyFixes } = useDiagnosticService();

  const handleRunDiagnostics = async () => {
    setIsRunning(true);
    try {
      const diagnosticResults = await runDiagnostics();
      setResults(diagnosticResults);
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
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                <Check className="h-5 w-5" />
                <span>No issues detected</span>
              </div>
            ) : (
              <>
                <p className="font-medium">Issues found ({results.issues.length}):</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {results.issues.map((issue, index) => (
                    <li key={index} className="text-red-600">{issue}</li>
                  ))}
                </ul>
                
                {results.automaticallyFixed > 0 && (
                  <div className="bg-green-50 p-3 rounded-md text-sm">
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
