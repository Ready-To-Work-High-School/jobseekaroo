
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const AuthCallbackLoading = () => {
  const [provider, setProvider] = useState<string>('authentication');
  const [isApple, setIsApple] = useState<boolean>(false);
  
  useEffect(() => {
    // Detect which provider is being used based on URL
    const url = window.location.href;
    if (url.includes('google')) {
      setProvider('Google');
    } else if (url.includes('apple')) {
      setProvider('Apple');
      setIsApple(true);
    }
    
    // Log additional information for debugging purposes
    console.log("Auth callback loading for provider:", provider);
    console.log("Current URL:", window.location.href);
    console.log("Hostname:", window.location.hostname);
  }, [provider]);
  
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
      
      <h3 className="text-xl font-bold text-primary mb-4">Completing {provider} Sign-In</h3>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <p className="text-muted-foreground">Verifying your credentials...</p>
      </div>
      
      <p className="text-sm text-gray-600">
        Please wait while we complete your sign-in process.
        <br />You will be redirected automatically.
      </p>
      
      {isApple && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-xs text-blue-700">
          <p>Apple Sign-In in progress. If you encounter issues:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Make sure cookies are enabled in your browser</li>
            <li>Try using Safari for best compatibility with Apple services</li>
            <li>Ensure you're signed in to your Apple ID</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthCallbackLoading;
