
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, Globe, Shield, ExternalLink } from 'lucide-react';

interface AuthCallbackErrorProps {
  error: string;
  diagnosticInfo: Record<string, any>;
}

const AuthCallbackError = ({ error, diagnosticInfo }: AuthCallbackErrorProps) => {
  const navigate = useNavigate();
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const handleTryAgain = () => {
    // Clear any stored session state
    sessionStorage.removeItem('supabase.auth.token');
    // Redirect to sign-in page
    navigate('/sign-in');
  };

  const toggleDiagnostics = () => {
    setShowDiagnostics(!showDiagnostics);
  };

  // Check if the error is related to Google connection issues
  const isGoogleConnectionError = error.includes('refused to connect') || 
                                  error.includes('connect to accounts.google.com');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="text-red-500 mb-4">
        <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
        <p className="text-lg font-semibold">Authentication Error</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
      
      {isGoogleConnectionError && (
        <Alert variant="destructive" className="my-4 bg-red-50 border-red-200 text-red-800">
          <AlertTitle className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Google Connection Problem
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">Your browser couldn't connect to Google's authentication servers. This could be due to:</p>
            <ul className="text-left list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Corporate or school network restrictions</li>
              <li>VPN or proxy interference</li>
              <li>Firewall settings blocking the connection</li>
              <li>Temporary Google service disruption</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {(error.includes('connection') || error.includes('refused to connect')) && (
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-sm text-amber-800 mb-4">
          <p className="font-medium">Troubleshooting Steps:</p>
          <ul className="text-left list-disc pl-4 mt-2 text-xs">
            <li>Check your internet connection</li>
            <li>Disable any VPN or proxy services temporarily</li>
            <li>Try using a different browser</li>
            <li>Make sure your browser allows third-party cookies</li>
            <li>Check if your network allows connections to Google services</li>
          </ul>
        </div>
      )}
      
      <div className="flex flex-col gap-3 mt-4">
        <Button 
          onClick={handleTryAgain} 
          className="w-full"
          variant="default"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        
        <Button 
          onClick={() => navigate('/')} 
          variant="outline"
          className="w-full"
        >
          <Home className="h-4 w-4 mr-2" />
          Return Home
        </Button>
        
        {isGoogleConnectionError && (
          <Button
            variant="ghost"
            className="w-full text-xs mt-1"
            onClick={() => window.open('https://status.cloud.google.com/', '_blank')}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            Check Google Cloud Status
          </Button>
        )}
        
        <Button
          onClick={toggleDiagnostics}
          variant="ghost"
          className="text-xs mt-2"
        >
          {showDiagnostics ? "Hide Diagnostics" : "Show Diagnostics"}
        </Button>
        
        {showDiagnostics && (
          <div className="mt-2 text-left bg-gray-50 p-3 rounded border text-xs font-mono overflow-x-auto">
            <p className="font-semibold mb-1">Diagnostic Information:</p>
            {Object.entries(diagnosticInfo).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">{key}:</span>
                <span className="col-span-2 break-all">{String(value)}</span>
              </div>
            ))}
            
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="font-semibold mb-1">Browser Security Info:</p>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">Third-party cookies:</span>
                <span className="col-span-2">{diagnosticInfo.cookiesEnabled ? "Allowed" : "May be blocked"}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">Protocol:</span>
                <span className="col-span-2">{diagnosticInfo.protocol || window.location.protocol}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackError;
