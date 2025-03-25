
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

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
          throw new Error(errorMessage);
        }
        
        // Get session
        const { data, error } = await supabase.auth.getSession();
        console.log("Auth callback session result:", { data, error });
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
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

  const toggleDiagnostics = () => {
    setShowDiagnostics(!showDiagnostics);
  };

  const handleTryAgain = () => {
    // Clear any stored session state
    sessionStorage.removeItem('supabase.auth.token');
    // Redirect to sign-in page
    navigate('/sign-in');
  };

  const handleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md w-full px-4">
        {error ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="text-red-500 mb-4">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Authentication Error</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
            
            {error.includes('connection') || error.includes('refused') ? (
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-sm text-amber-800 mb-4">
                <p className="font-medium">Connection Problem Detected</p>
                <ul className="text-left list-disc pl-4 mt-2 text-xs">
                  <li>Check your internet connection</li>
                  <li>Make sure your browser allows third-party cookies</li>
                  <li>Try using a different browser</li>
                  <li>Ensure any security software isn't blocking authentication</li>
                </ul>
              </div>
            ) : null}
            
            <div className="flex flex-col gap-3 mt-4">
              <Button 
                onClick={handleTryAgain} 
                className="w-full"
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Button>
              
              <Button
                onClick={toggleDiagnostics}
                variant="ghost"
                className="text-xs mt-2"
              >
                {showDiagnostics ? "Hide Diagnostics" : "Show Diagnostics"}
              </Button>
              
              {showDiagnostics && (
                <div className="mt-2 text-left bg-gray-50 p-3 rounded border text-xs font-mono overflow-x-auto">
                  <p className="font-semibold mb-1">Diagnostic Information:</p>
                  {Object.entries(diagnosticInfo).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-1">
                      <span className="text-gray-500">{key}:</span>
                      <span className="col-span-2 break-all">{String(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Completing Sign In...</h2>
            <p className="text-muted-foreground">
              Please wait while we authenticate your account
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
