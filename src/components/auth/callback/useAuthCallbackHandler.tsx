
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAuthCallbackHandler = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Collect diagnostic information
    const collectDiagnostics = () => {
      const info = {
        url: window.location.href,
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        userAgent: navigator.userAgent,
        online: navigator.onLine,
        timestamp: new Date().toISOString(),
        redirectPath: sessionStorage.getItem('redirectAfterLogin'),
        // Check for hash and query params without logging sensitive info
        hasHashParams: window.location.hash ? 'Yes' : 'No',
        hasQueryParams: window.location.search ? 'Yes' : 'No',
        googleAuthConfigured: true,
        supportsThirdPartyCookies: document.hasStorageAccess ? "Checking..." : "Unknown (old browser)",
      };
      
      setDiagnosticInfo(info);
      console.log("Auth callback diagnostic info:", info);
      
      // Check storage access for modern browsers
      if (document.hasStorageAccess) {
        document.hasStorageAccess().then(
          hasAccess => {
            setDiagnosticInfo(current => ({
              ...current, 
              supportsThirdPartyCookies: hasAccess ? "Yes" : "No"
            }));
          }
        ).catch(err => {
          setDiagnosticInfo(current => ({
            ...current, 
            supportsThirdPartyCookies: `Error checking: ${err.message}`
          }));
        });
      }
      
      return info;
    };

    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback initiated");
        console.log("URL:", window.location.href);
        
        // Test if we can connect to Google's auth domain
        try {
          const googleTest = await fetch('https://accounts.google.com/gsi/status', { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
          });
          console.log("Google connectivity test completed");
        } catch (connErr) {
          console.error('Connection to Google failed:', connErr);
          setDiagnosticInfo(current => ({
            ...current,
            googleConnectionError: connErr.message
          }));
          
          // Don't set an error here, continue with auth flow
        }
        
        // Check if there's a hash fragment in the URL (OAuth response)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (hashParams.has('error')) {
          const error = hashParams.get('error');
          const errorDescription = hashParams.get('error_description');
          const errorMessage = `${error}: ${errorDescription}`;
          console.error("OAuth error from hash:", errorMessage);
          setError(errorMessage);
          setIsLoading(false);
          throw new Error(errorMessage);
        }
        
        // Check for error in query params too
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('error')) {
          const error = queryParams.get('error');
          const errorDescription = queryParams.get('error_description');
          const errorMessage = `${error}: ${errorDescription}`;
          console.error("OAuth error from query:", errorMessage);
          setError(errorMessage);
          setIsLoading(false);
          throw new Error(errorMessage);
        }
        
        // Get session
        const { data, error } = await supabase.auth.getSession();
        console.log("Auth callback session result:", { data, error });
        
        if (error) {
          console.error('Auth callback error:', error);
          
          // Special handling for connection errors
          if (error.message?.includes('refused to connect')) {
            setError(`Connection error: accounts.google.com refused to connect. This could be due to network restrictions, VPN settings, or browser security features.`);
          } else {
            setError(error.message);
          }
          
          setIsLoading(false);
          toast({
            title: 'Authentication Error',
            description: error.message || 'Failed to complete authentication',
            variant: 'destructive',
          });
          navigate('/sign-in');
          return;
        }

        // Check if user is authenticated
        if (!data?.session?.user) {
          console.error('No user found in session');
          setError('User session not found');
          setIsLoading(false);
          toast({
            title: 'Authentication Error',
            description: 'User session not found',
            variant: 'destructive',
          });
          navigate('/sign-in');
          return;
        }

        // Check if there's a saved redirect URL
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        console.log("Redirect URL from session storage:", redirectUrl);
        
        if (redirectUrl) {
          sessionStorage.removeItem('redirectAfterLogin');
          navigate(redirectUrl);
        } else {
          navigate('/');
        }
        
        toast({
          title: 'Success',
          description: 'You have successfully signed in',
        });
      } catch (err: any) {
        console.error('Error in auth callback:', err);
        
        // Enhanced error handling
        let errorMessage = err.message || 'Unknown authentication error';
        
        // Special handling for connection errors
        if (errorMessage.includes('refused to connect') || 
            errorMessage.includes('network') ||
            !navigator.onLine) {
          errorMessage = 'Connection error: accounts.google.com refused to connect. This could be due to network restrictions, VPN settings, or browser security features.';
          
          // Add specific diagnostic info
          setDiagnosticInfo(current => ({
            ...current,
            connectionIssue: true,
            possibleFirewallBlock: true,
            checkNetworkSettings: true
          }));
        }
        
        setError(errorMessage);
        setIsLoading(false);
        
        toast({
          title: 'Authentication Error',
          description: errorMessage || 'Failed to complete authentication',
          variant: 'destructive',
        });
      }
    };

    const diagnostics = collectDiagnostics();
    handleAuthCallback();
  }, [navigate, toast]);

  return { error, diagnosticInfo, isLoading };
};
