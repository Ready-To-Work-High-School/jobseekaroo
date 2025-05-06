
import React from 'react';
import GoogleSignInButton from './buttons/GoogleSignInButton';
import AppleSignInButton from './buttons/AppleSignInButton';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface SocialAuthButtonsProps {
  onGoogleSignIn?: () => Promise<void>;
  onAppleSignIn?: () => Promise<void>;
  isGoogleLoading?: boolean;
  isAppleLoading?: boolean;
  isFormLoading?: boolean;
  disabled?: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ 
  onGoogleSignIn,
  onAppleSignIn,
  isGoogleLoading = false,
  isAppleLoading = false,
  isFormLoading = false,
  disabled = false
}) => {
  const isOnline = useNetworkStatus();
  const buttonsDisabled = disabled || !isOnline || isFormLoading;
  
  return (
    <div className="flex flex-col space-y-3">
      <GoogleSignInButton 
        onClick={onGoogleSignIn || (async () => Promise.resolve())} 
        isLoading={isGoogleLoading} 
        disabled={buttonsDisabled} 
      />
      <AppleSignInButton 
        onClick={onAppleSignIn || (async () => Promise.resolve())} 
        isLoading={isAppleLoading} 
        disabled={buttonsDisabled} 
      />

      {!isOnline && (
        <p className="text-sm text-red-500 text-center">
          You're offline. Please check your internet connection.
        </p>
      )}
    </div>
  );
};

export default SocialAuthButtons;
