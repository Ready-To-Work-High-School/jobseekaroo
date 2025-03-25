
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import AppleSignInButton from "./buttons/AppleSignInButton";
import DiagnosticPanel from "./diagnostic/DiagnosticPanel";
import NetworkOfflineState from "./diagnostic/NetworkOfflineState";
import { useDiagnosticInfo } from "./diagnostic/useDiagnosticInfo";
import { useNetworkStatus } from "./hooks/useNetworkStatus";

interface SocialAuthButtonsProps {
  onAppleSignIn: () => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isAppleLoading: boolean;
  isGoogleLoading: boolean;
  isFormLoading: boolean;
}

const SocialAuthButtons = ({
  onAppleSignIn,
  onGoogleSignIn,
  isAppleLoading,
  isGoogleLoading,
  isFormLoading
}: SocialAuthButtonsProps) => {
  const { toast } = useToast();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [appleError, setAppleError] = useState<string | null>(null);
  const [showGoogleDebugInfo, setShowGoogleDebugInfo] = useState(false);
  const [showAppleDebugInfo, setShowAppleDebugInfo] = useState(false);
  
  const isOnline = useNetworkStatus();
  const diagnosticInfo = useDiagnosticInfo();
  
  const handleGoogleSignIn = async () => {
    try {
      setGoogleError(null);
      
      if (!navigator.onLine) {
        const message = "You appear to be offline. Please check your internet connection.";
        setGoogleError(message);
        toast({
          title: "Network Error",
          description: message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Initiating Google sign-in from SocialAuthButtons');
      console.log('Connection status:', { 
        online: navigator.onLine,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        cookiesEnabled: navigator.cookieEnabled
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      await onGoogleSignIn();
    } catch (error: any) {
      console.error('Google sign-in error in component:', error);
      
      let errorMessage = error?.message || "Sign-in failed";
      if (errorMessage.includes("network") || errorMessage.includes("connection") || 
          errorMessage.includes("refused")) {
        errorMessage = "Connection to Google failed. This could be due to:";
        setGoogleError(errorMessage);
        setShowGoogleDebugInfo(true);
      } else {
        setGoogleError(errorMessage);
      }
      
      toast({
        title: "Google Sign-In Error",
        description: "Failed to connect to Google authentication. See details below for troubleshooting.",
        variant: "destructive",
      });
    }
  };
  
  const handleAppleSignIn = async () => {
    try {
      setAppleError(null);
      
      if (!navigator.onLine) {
        const message = "You appear to be offline. Please check your internet connection.";
        setAppleError(message);
        toast({
          title: "Network Error",
          description: message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Initiating Apple sign-in from SocialAuthButtons');
      console.log('Connection status:', { 
        online: navigator.onLine,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        cookiesEnabled: navigator.cookieEnabled
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      await onAppleSignIn();
    } catch (error: any) {
      console.error('Apple sign-in error in component:', error);
      
      let errorMessage = error?.message || "Sign-in failed";
      if (errorMessage.includes("network") || errorMessage.includes("connection") || 
          errorMessage.includes("refused")) {
        errorMessage = "Connection to Apple failed. This could be due to:";
        setAppleError(errorMessage);
        setShowAppleDebugInfo(true);
      } else {
        setAppleError(errorMessage);
      }
      
      toast({
        title: "Apple Sign-In Error",
        description: error?.message || "Could not sign in with Apple. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!isOnline) {
    return <NetworkOfflineState />;
  }
  
  return (
    <div className="space-y-3">
      <GoogleSignInButton 
        onClick={handleGoogleSignIn}
        isLoading={isGoogleLoading}
        disabled={isFormLoading}
      />
      
      {googleError && (
        <DiagnosticPanel 
          errorMessage={googleError}
          diagnosticInfo={diagnosticInfo}
          showDebugInfo={showGoogleDebugInfo}
          onToggleDebugInfo={() => setShowGoogleDebugInfo(!showGoogleDebugInfo)}
        />
      )}
      
      <AppleSignInButton 
        onClick={handleAppleSignIn}
        isLoading={isAppleLoading}
        disabled={isFormLoading}
      />
      
      {appleError && (
        <DiagnosticPanel 
          errorMessage={appleError}
          diagnosticInfo={diagnosticInfo}
          showDebugInfo={showAppleDebugInfo}
          onToggleDebugInfo={() => setShowAppleDebugInfo(!showAppleDebugInfo)}
        />
      )}
    </div>
  );
};

export default SocialAuthButtons;
