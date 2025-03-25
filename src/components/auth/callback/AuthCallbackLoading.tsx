
import React from 'react';

const AuthCallbackLoading = () => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-2xl font-semibold mb-2">Completing Sign In...</h2>
      <p className="text-muted-foreground">
        Please wait while we authenticate your account
      </p>
    </div>
  );
};

export default AuthCallbackLoading;
