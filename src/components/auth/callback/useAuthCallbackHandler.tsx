
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
    // Security sanitization - clean any residual tokens from storage
    sessionStorage.removeItem('tempAuthToken');
    
    // Collect diagnostic information (safe fields only)
    const collectDiagnostics = () => {
      // Only collect non-sensitive information
      const info = {
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        online: navigator.onLine,
        timestamp: new Date().toISOString(),
        redirectPath: sessionStorage.getItem('redirectAfterLogin'),
      };
      
      setDiagnosticInfo(info);
      return info;
    };
    
    const diagnostics = collectDiagnostics();
    
    // Handle auth callback with security checks
    const handleAuthCallback = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Authentication timed out')), 10000);
        });
        
        // Race against timeout for security
        const { data, error } = await Promise.race([
          supabase.auth.getSession(),
          timeoutPromise
        ]) as any;
        
        if (error) throw error;
        
        // Check for valid session
        if (!data?.session) {
          throw new Error('No valid session found');
        }
        
        // Successfully authenticated
        toast({
          title: 'Authentication successful',
          description: 'You have been successfully logged in',
        });
        
        // Redirect to intended destination or default
        const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
        sessionStorage.removeItem('redirectAfterLogin');
        
        // Use timeout to prevent immediate navigation during state updates
        setTimeout(() => navigate(redirectPath), 100);
      } catch (err: any) {
        console.error('Auth callback error:', err);
        
        // Provide user-friendly error message
        const friendlyMessage = 
          err.message === 'Authentication timed out' ? 'Authentication process took too long. Please try again.' :
          err.message === 'No valid session found' ? 'Authentication failed. Please try logging in again.' :
          'Authentication error. Please try again.';
        
        setError(friendlyMessage);
        
        // Add error details to diagnostics
        setDiagnosticInfo(prev => ({
          ...prev,
          errorType: err.name,
          errorMessage: friendlyMessage,
          errorTimestamp: new Date().toISOString(),
        }));
        
        // Security measure: clear any partial authentication state
        supabase.auth.signOut().catch(e => console.error('Cleanup error:', e));
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return {
    error,
    diagnosticInfo,
    isLoading
  };
};

export default useAuthCallbackHandler;
