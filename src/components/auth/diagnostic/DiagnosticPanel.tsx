
import { Button } from "@/components/ui/button";
import { AlertTriangle, InfoIcon } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DiagnosticPanelProps {
  errorMessage: string;
  diagnosticInfo: Record<string, any>;
  showDebugInfo: boolean;
  onToggleDebugInfo: () => void;
}

const DiagnosticPanel = ({ 
  errorMessage, 
  diagnosticInfo, 
  showDebugInfo, 
  onToggleDebugInfo 
}: DiagnosticPanelProps) => {
  return (
    <div className="text-sm text-red-500 bg-red-50 p-3 rounded border border-red-200">
      <div className="flex items-start">
        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p>{errorMessage}</p>
          {errorMessage.includes("Connection to Google failed") && (
            <ul className="list-disc pl-5 mt-2 text-xs space-y-1">
              <li>Browser restrictions on third-party cookies</li>
              <li>Network firewall or proxy blocking the connection</li>
              <li>Google service disruption</li>
              <li>Incorrect OAuth configuration</li>
            </ul>
          )}
        </div>
      </div>
      
      <Collapsible open={showDebugInfo} onOpenChange={onToggleDebugInfo} className="mt-3">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
            <InfoIcon className="h-3 w-3 mr-1" />
            {showDebugInfo ? "Hide diagnostic info" : "Show diagnostic info"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="bg-white p-2 rounded border text-xs font-mono">
            <h4 className="font-medium mb-1">Browser Diagnostics:</h4>
            {Object.entries(diagnosticInfo).map(([key, value]) => (
              <div key={key} className="grid grid-cols-5 gap-1 mb-1">
                <span className="col-span-2 text-gray-500">{key}:</span>
                <span className="col-span-3">{String(value)}</span>
              </div>
            ))}
            
            <h4 className="font-medium mt-3 mb-1">Troubleshooting Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Check if third-party cookies are enabled in your browser</li>
              <li>Try a different browser (Chrome, Firefox, etc.)</li>
              <li>Verify the Google Cloud Console settings match your domain</li>
              <li>Check that JavaScript origins include http://localhost:3000</li>
              <li>Clear browser cache and cookies</li>
            </ol>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DiagnosticPanel;
