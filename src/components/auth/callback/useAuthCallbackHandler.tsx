
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
      };
      setDiagnosticInfo(info);
      console.log("Auth callback diagnostic info:", info);
      return info;
    };

    const diagnostics = collectDiagnostics();

    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback initiated");
        console.log("URL:", window.location.href);
        
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
          setError(error.message);
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
        setError(err.message || 'Unknown authentication error');
        setIsLoading(false);
        
        // Special handling for connection errors
        if (err.message?.includes('refused to connect') || 
            err.message?.includes('network') ||
            !navigator.onLine) {
          setError('Connection error: There was a problem connecting to the authentication service. Please check your internet connection and try again.');
        }
        
        toast({
          title: 'Authentication Error',
          description: err.message || 'Failed to complete authentication',
          variant: 'destructive',
        });
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return { error, diagnosticInfo, isLoading };
};
