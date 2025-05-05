
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import DiagnosticPanel from '@/components/ErrorRecovery/DiagnosticPanel';
import ConnectivityError from '@/components/ErrorRecovery/ConnectivityError';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Trash, 
  Database, 
  Activity, 
  LifeBuoy,
  UserX
} from 'lucide-react';

// Network status types
type NetworkStatus = 'unknown' | 'online' | 'offline' | 'degraded';

const SystemDiagnosticsPage: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('unknown');
  const [databaseStatus, setDatabaseStatus] = useState<string>('unknown');
  const [showDetails, setShowDetails] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Initialize status checks
    checkNetworkStatus();
    checkDatabaseConnectivity();
    fetchSessionData();

    // Set up interval to periodically check network status
    const networkInterval = setInterval(checkNetworkStatus, 30000);
    
    return () => {
      clearInterval(networkInterval);
    };
  }, []);

  useEffect(() => {
    // Reset connection error state when we're back online
    if (isOnline && hasConnectionError) {
      checkDatabaseConnectivity();
    }
  }, [isOnline, hasConnectionError]);

  const checkNetworkStatus = async () => {
    if (!navigator.onLine) {
      setNetworkStatus('offline');
      return;
    }

    try {
      // Attempt to fetch a small resource with a cache-busting parameter
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1?_=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (response.ok) {
        setNetworkStatus('online');
      } else {
        // If the response is not OK, set status to degraded, not "error"
        setNetworkStatus('degraded');
      }
    } catch (error) {
      console.error('Network check failed:', error);
      // In case of an error, set status to degraded, not "error"
      setNetworkStatus('degraded');
      toast(`Network connectivity issues detected: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const checkDatabaseConnectivity = async () => {
    try {
      setIsLoading(true);
      setHasConnectionError(false);
      const startTime = performance.now();
      
      // Simple query to check database connectivity
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      if (error) {
        console.error('Database connectivity error:', error);
        setDatabaseStatus(`Error: ${error.message}`);
        toast.error(`Database connectivity issue: ${error.message}`);
        
        // If we get a fetch error, set the connection error state
        if (error.message.includes('fetch') || error.message.includes('network')) {
          setHasConnectionError(true);
        }
      } else {
        setDatabaseStatus(`Connected (response time: ${responseTime}ms)`);
        setHasConnectionError(false);
      }
    } catch (error) {
      console.error('Database check failed:', error);
      setDatabaseStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error(`Database connectivity issue: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setHasConnectionError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = async () => {
    setIsRetrying(true);
    try {
      await checkNetworkStatus();
      await checkDatabaseConnectivity();
      await fetchSessionData();
    } finally {
      setIsRetrying(false);
    }
  };

  const fetchSessionData = async () => {
    if (!isOnline) {
      toast.error("Cannot fetch session data while offline");
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session fetch error:', error);
        toast.error(`Session fetch error: ${error.message}`);
        return;
      }
      
      setSessionData(data.session);
    } catch (error) {
      console.error('Session fetch failed:', error);
      toast.error(`Session fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Local storage cleared successfully");
    } catch (error) {
      console.error('Error clearing storage:', error);
      toast.error(`Failed to clear storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearSessionData = async () => {
    try {
      await supabase.auth.refreshSession();
      toast.success("Session data refreshed");
      fetchSessionData();
    } catch (error) {
      console.error('Error refreshing session:', error);
      toast.error(`Failed to refresh session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const restartApplication = () => {
    // Hard reload the page
    window.location.href = "/";
  };

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
        toast.success("Signed out successfully");
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(`Failed to sign out: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // If we're detecting a connection error, show the connectivity error component
  if (hasConnectionError) {
    return (
      <div className="container py-10">
        <ConnectivityError 
          onRetry={handleRetryConnection} 
          isRetrying={isRetrying}
          errorMessage="There was a problem connecting to the Supabase database. This could be due to network issues or server problems."
        />
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">System Diagnostics</h1>
        <p className="text-muted-foreground">
          Check and troubleshoot system components
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current status of system components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Network Connectivity:</span>
              <div className="flex items-center gap-2">
                {networkStatus === 'online' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600">Online</span>
                  </>
                ) : networkStatus === 'offline' ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="text-red-600">Offline</span>
                  </>
                ) : networkStatus === 'degraded' ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-amber-600">Degraded</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                    <span className="text-blue-600">Checking...</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Database Connection:</span>
              <div className="flex items-center gap-2">
                {databaseStatus.includes('Error') ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="text-red-600">Error</span>
                  </>
                ) : databaseStatus.includes('Connected') ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600">{databaseStatus}</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className={`h-5 w-5 text-blue-500 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="text-blue-600">Checking...</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Authentication Status:</span>
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600">Authenticated</span>
                  </>
                ) : (
                  <>
                    <UserX className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Not authenticated</span>
                  </>
                )}
              </div>
            </div>

            {showDetails && sessionData && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-2">Session Details:</h4>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(sessionData, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button 
              onClick={handleRetryConnection}
              size="sm"
              disabled={isRetrying}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Refreshing...' : 'Refresh Status'}
            </Button>
          </CardFooter>
        </Card>

        <DiagnosticPanel showDetails={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5" />
            Troubleshooting Actions
          </CardTitle>
          <CardDescription>
            Common actions to resolve system issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={clearLocalStorage}
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear Local Storage
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={clearSessionData}
            >
              <Database className="mr-2 h-4 w-4" />
              Refresh Session Data
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={restartApplication}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Application
            </Button>
            
            {user && (
              <Button 
                variant="outline" 
                className="justify-start text-red-500 hover:text-red-600"
                onClick={handleSignOut}
              >
                <UserX className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDiagnosticsPage;
