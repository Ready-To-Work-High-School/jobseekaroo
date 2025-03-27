
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const AuthCallbackLoading = () => {
  const [provider, setProvider] = useState<string>('authentication');
  
  useEffect(() => {
    // Detect which provider is being used based on URL
    const url = window.location.href;
    if (url.includes('google')) {
      setProvider('Google');
    } else if (url.includes('apple')) {
      setProvider('Apple');
    }
  }, []);
  
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
    </div>
  );
};

export default AuthCallbackLoading;
