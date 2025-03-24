
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        toast({
          title: 'Authentication Error',
          description: err.message || 'Failed to complete authentication',
          variant: 'destructive',
        });
        navigate('/sign-in');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {error ? (
          <div className="text-red-500 mb-4">
            <p className="text-lg font-semibold">Authentication Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        )}
        <h2 className="text-2xl font-semibold mb-2">
          {error ? 'Sign In Failed' : 'Completing Sign In...'}
        </h2>
        <p className="text-muted-foreground">
          {error 
            ? 'Please try again or use a different sign-in method' 
            : 'Please wait while we authenticate your account'}
        </p>
        {error && (
          <button 
            onClick={() => navigate('/sign-in')} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Return to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
