
import React, { useEffect, useState } from 'react';
import { useAuthCallbackHandler } from '@/components/auth/callback/useAuthCallbackHandler';
import AuthCallbackLoading from '@/components/auth/callback/AuthCallbackLoading';
import AuthCallbackError from '@/components/auth/callback/AuthCallbackError';
import AuthProviderDisabledError from '@/components/auth/callback/AuthProviderDisabledError';

export default function AuthCallback() {
  const { error, diagnosticInfo, isLoading } = useAuthCallbackHandler();
  const [disabledProvider, setDisabledProvider] = useState<string | null>(null);

  useEffect(() => {
    // Check if the error is about a disabled provider
    if (error) {
      if (error.toLowerCase().includes('provider is not enabled') || 
          error.toLowerCase().includes('validation_failed')) {
        
        // Try to determine which provider was attempted
        const searchParams = new URLSearchParams(window.location.search);
        const provider = searchParams.get('provider') || 
                        (error.toLowerCase().includes('apple') ? 'apple' : 
                         error.toLowerCase().includes('google') ? 'google' : 'social');
        
        setDisabledProvider(provider);
      }
    }
  }, [error]);

  if (disabledProvider) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md w-full px-4">
          <AuthProviderDisabledError provider={disabledProvider} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md w-full px-4">
        {error ? (
          <AuthCallbackError error={error} diagnosticInfo={diagnosticInfo} />
        ) : (
          <AuthCallbackLoading />
        )}
      </div>
    </div>
  );
}
