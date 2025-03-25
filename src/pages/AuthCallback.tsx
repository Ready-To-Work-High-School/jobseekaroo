
import React from 'react';
import { useAuthCallbackHandler } from '@/components/auth/callback/useAuthCallbackHandler';
import AuthCallbackLoading from '@/components/auth/callback/AuthCallbackLoading';
import AuthCallbackError from '@/components/auth/callback/AuthCallbackError';

export default function AuthCallback() {
  const { error, diagnosticInfo, isLoading } = useAuthCallbackHandler();

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
