
import React from 'react';
import GoogleSignInButton from './buttons/GoogleSignInButton';
import AppleSignInButton from './buttons/AppleSignInButton';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface SocialAuthButtonsProps {
  onGoogleSignIn?: () => void;
  onAppleSignIn?: () => void;
  disabled?: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ 
  onGoogleSignIn,
  onAppleSignIn,
  disabled = false
}) => {
  const isOnline = useNetworkStatus();
  const buttonsDisabled = disabled || !isOnline;
  
  return (
    <div className="flex flex-col space-y-3">
      <GoogleSignInButton onClick={onGoogleSignIn} disabled={buttonsDisabled} />
      <AppleSignInButton onClick={onAppleSignIn} disabled={buttonsDisabled} />

      {!isOnline && (
        <p className="text-sm text-red-500 text-center">
          You're offline. Please check your internet connection.
        </p>
      )}
    </div>
  );
};

export default SocialAuthButtons;
