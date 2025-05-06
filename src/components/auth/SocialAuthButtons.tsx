
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import AppleSignInButton from "./buttons/AppleSignInButton";
import DiagnosticPanel from "./diagnostic/DiagnosticPanel";
import NetworkOfflineState from "./diagnostic/NetworkOfflineState";
import { useDiagnosticInfo } from "./diagnostic/useDiagnosticInfo";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialAuthButtonsProps {
  onAppleSignIn: () => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isAppleLoading?: boolean;
  isGoogleLoading?: boolean;
  isFormLoading?: boolean;
}

const SocialAuthButtons = ({
  onAppleSignIn,
  onGoogleSignIn,
  isAppleLoading = false,
  isGoogleLoading = false,
  isFormLoading = false
}: SocialAuthButtonsProps) => {
  const { toast } = useToast();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [appleError, setAppleError] = useState<string | null>(null);
  const [showGoogleDebugInfo, setShowGoogleDebugInfo] = useState(false);
  const [showAppleDebugInfo, setShowAppleDebugInfo] = useState(false);
  const [isAppleDisabled, setIsAppleDisabled] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const isOnline = useNetworkStatus();
  const diagnosticInfo = useDiagnosticInfo();
  
  // Effect to check for reload-specific issues
  useEffect(() => {
    // Clear any previous errors when component mounts/remounts
    setGoogleError(null);
    setAppleError(null);
  }, []);
  
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
        cookiesEnabled: navigator.cookieEnabled,
        retryCount: retryCount
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      await onGoogleSignIn();
    } catch (error: any) {
      console.error('Google sign-in error in component:', error);
      
      let errorMessage = error?.message || "Sign-in failed";
      if (errorMessage.includes("network") || errorMessage.includes("connection") || 
          errorMessage.includes("refused") || errorMessage.includes("failed to fetch")) {
        errorMessage = "Connection to Google failed. This could be due to network issues or browser settings:";
        setGoogleError(errorMessage);
        setShowGoogleDebugInfo(true);
        
        toast({
          title: "Google Sign-In Error",
          description: "Failed to connect to authentication service. Please try again.",
          variant: "destructive",
        });
      } else {
        setGoogleError(errorMessage);
        
        toast({
          title: "Google Sign-In Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
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
        cookiesEnabled: navigator.cookieEnabled,
        retryCount: retryCount
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
          errorMessage.includes("refused") || errorMessage.includes("failed to fetch")) {
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
  
  const handleRetry = (provider: 'google' | 'apple') => {
    setRetryCount(prev => prev + 1);
    if (provider === 'google') {
      setGoogleError(null);
      setShowGoogleDebugInfo(false);
      setTimeout(handleGoogleSignIn, 500);
    } else {
      setAppleError(null);
      setShowAppleDebugInfo(false);
      setTimeout(handleAppleSignIn, 500);
    }
  };
  
  if (!isOnline) {
    return <NetworkOfflineState onRetry={() => window.location.reload()} />;
  }
  
  return (
    <div className="space-y-3">
      <GoogleSignInButton 
        onClick={handleGoogleSignIn}
        isLoading={isGoogleLoading}
        disabled={isFormLoading || !isOnline}
      />
      
      {googleError && (
        <div className="space-y-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {googleError}
            </AlertDescription>
          </Alert>
          
          {googleError.includes("network") || googleError.includes("failed to fetch") || googleError.includes("connection") && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleRetry('google')}
              >
                <Wifi className="h-4 w-4" />
                Retry Connection
              </Button>
            </div>
          )}
          
          {showGoogleDebugInfo && (
            <DiagnosticPanel 
              errorMessage={googleError}
              diagnosticInfo={diagnosticInfo}
              showDebugInfo={showGoogleDebugInfo}
              onToggleDebugInfo={() => setShowGoogleDebugInfo(!showGoogleDebugInfo)}
              provider="google"
            />
          )}
        </div>
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
          disabled={isFormLoading || isAppleDisabled || !isOnline}
        />
      )}
      
      {appleError && !isAppleDisabled && (
        <div className="space-y-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {appleError}
            </AlertDescription>
          </Alert>
          
          {appleError.includes("network") || appleError.includes("failed to fetch") || appleError.includes("connection") && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleRetry('apple')}
              >
                <Wifi className="h-4 w-4" />
                Retry Connection
              </Button>
            </div>
          )}
          
          {showAppleDebugInfo && (
            <DiagnosticPanel 
              errorMessage={appleError}
              diagnosticInfo={diagnosticInfo}
              showDebugInfo={showAppleDebugInfo}
              onToggleDebugInfo={() => setShowAppleDebugInfo(!showAppleDebugInfo)}
              provider="apple"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SocialAuthButtons;
