
import React, { useState } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronDown, ChevronUp, Wifi, Globe, ShieldAlert, Apple } from "lucide-react";

interface DiagnosticPanelProps {
  errorMessage: string;
  diagnosticInfo: Record<string, any>;
  showDebugInfo: boolean;
  onToggleDebugInfo: () => void;
  provider?: 'google' | 'apple';
}

const DiagnosticPanel = ({ 
  errorMessage, 
  diagnosticInfo, 
  showDebugInfo, 
  onToggleDebugInfo,
  provider
}: DiagnosticPanelProps) => {
  const truncatedDiagnostics = Object.entries(diagnosticInfo).slice(0, 5);
  
  const getProviderSpecificHelp = () => {
    if (provider === 'google') {
      return (
        <div className="pt-2 border-t border-gray-200 mt-2 text-xs">
          <p className="font-medium mb-1">Google Sign-In Troubleshooting:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Check if third-party cookies are enabled in your browser</li>
            <li>Try using Chrome or Edge instead of Safari</li>
            <li>Check if your browser is in private/incognito mode</li>
          </ul>
        </div>
      );
    } else if (provider === 'apple') {
      return (
        <div className="pt-2 border-t border-gray-200 mt-2 text-xs">
          <p className="font-medium mb-1">Apple Sign-In Troubleshooting:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Make sure you're signed in to your Apple ID on your device</li>
            <li>Check if your browser allows popups from this site</li>
            <li>Try using Safari for the most seamless Apple Sign-In experience</li>
            <li>Verify the domain in your Apple Developer account matches <code>{window.location.hostname}</code></li>
            <li>Ensure the callback URL is configured properly in both Supabase and Apple Developer portal</li>
          </ul>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Alert variant="destructive" className="text-xs bg-red-50 border-red-200 text-red-800">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
        <div className="flex-1">
          <AlertDescription className="font-medium">
            {errorMessage}
          </AlertDescription>
          
          {getProviderSpecificHelp()}
          
          <div className="flex items-center justify-between mt-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-auto py-1 px-2 text-xs flex items-center text-red-700 hover:text-red-800 hover:bg-red-100"
              onClick={onToggleDebugInfo}
            >
              {showDebugInfo ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Hide troubleshooting info
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show troubleshooting info
                </>
              )}
            </Button>
          </div>
          
          {showDebugInfo && (
            <div className="mt-2 border-t border-red-200 pt-2 space-y-2">
              <div className="flex items-center gap-1 text-red-700">
                <Wifi className="h-3 w-3" />
                <span>Network: {diagnosticInfo.online ? 'Online' : 'Offline'}</span>
              </div>
              
              <div className="flex items-center gap-1 text-red-700">
                <Globe className="h-3 w-3" />
                <span>Protocol: {diagnosticInfo.protocol}</span>
              </div>
              
              <div className="flex items-center gap-1 text-red-700">
                <ShieldAlert className="h-3 w-3" />
                <span>Cookies: {diagnosticInfo.cookiesEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              
              {provider === 'apple' && (
                <div className="flex items-center gap-1 text-red-700">
                  <Apple className="h-3 w-3" />
                  <span>Domain: {window.location.hostname}</span>
                </div>
              )}
              
              {truncatedDiagnostics.map(([key, value]) => (
                <div key={key} className="text-xs text-red-700">
                  <span className="font-mono">{key}: </span>
                  <span className="font-mono">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default DiagnosticPanel;
