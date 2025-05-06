
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import AppleSignInButton from "./buttons/AppleSignInButton";
import DiagnosticPanel from "./diagnostic/DiagnosticPanel";
import NetworkOfflineState from "./diagnostic/NetworkOfflineState";
import { useDiagnosticInfo } from "./diagnostic/useDiagnosticInfo";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const [isAppleDisabled, setIsAppleDisabled] = useState(false);
  
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
        errorMessage = "Connection to Google failed. This could be due to network issues or browser settings:";
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
      
      // Handle specific apple provider not enabled error
      if (errorMessage.includes("provider is not enabled") || 
          errorMessage.includes("validation_failed")) {
        errorMessage = "Apple Sign-In is not enabled for this application. Please use another sign-in method.";
        setIsAppleDisabled(true);
      } else if (errorMessage.includes("network") || errorMessage.includes("connection") || 
          errorMessage.includes("refused")) {
        errorMessage = "Connection to Apple failed. This could be due to network issues or browser settings:";
        setShowAppleDebugInfo(true);
      }
      
      setAppleError(errorMessage);
      
      toast({
        title: "Apple Sign-In Error",
        description: errorMessage,
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
          provider="google"
        />
      )}
      
      {isAppleDisabled ? (
        <Alert variant="destructive" className="mt-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Apple Sign-In is not currently enabled for this application.
          </AlertDescription>
        </Alert>
      ) : (
        <AppleSignInButton 
          onClick={handleAppleSignIn}
          isLoading={isAppleLoading}
          disabled={isFormLoading || isAppleDisabled}
        />
      )}
      
      {appleError && !isAppleDisabled && (
        <DiagnosticPanel 
          errorMessage={appleError}
          diagnosticInfo={diagnosticInfo}
          showDebugInfo={showAppleDebugInfo}
          onToggleDebugInfo={() => setShowAppleDebugInfo(!showAppleDebugInfo)}
          provider="apple"
        />
      )}
    </div>
  );
};

export default SocialAuthButtons;
