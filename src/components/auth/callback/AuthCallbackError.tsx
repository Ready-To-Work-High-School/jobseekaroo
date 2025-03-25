
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="text-red-500 mb-4">
        <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
        <p className="text-lg font-semibold">Authentication Error</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
      
      {error.includes('connection') || error.includes('refused') ? (
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-sm text-amber-800 mb-4">
          <p className="font-medium">Connection Problem Detected</p>
          <ul className="text-left list-disc pl-4 mt-2 text-xs">
            <li>Check your internet connection</li>
            <li>Make sure your browser allows third-party cookies</li>
            <li>Try using a different browser</li>
            <li>Ensure any security software isn't blocking authentication</li>
          </ul>
        </div>
      ) : null}
      
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackError;
