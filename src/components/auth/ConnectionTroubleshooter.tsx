
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, WifiOff, CheckCircle, RefreshCw } from 'lucide-react';

interface ConnectionTroubleshooterProps {
  onRetryConnection: () => void;
}

const ConnectionTroubleshooter: React.FC<ConnectionTroubleshooterProps> = ({ onRetryConnection }) => {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    name: string;
    status: 'success' | 'error' | 'warning';
    message: string;
  }>>([]);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );

  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const runNetworkDiagnostics = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    const results = [];

    // 1. Check basic network connectivity
    results.push({
      name: 'Internet Connection',
      status: navigator.onLine ? 'success' : 'error',
      message: navigator.onLine 
        ? 'Your device is connected to the internet' 
        : 'Your device is not connected to the internet'
    });

    // 2. Check for cookie and local storage support
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      results.push({
        name: 'Local Storage',
        status: 'success',
        message: 'Local storage is available and working'
      });
    } catch (e) {
      results.push({
        name: 'Local Storage',
        status: 'error',
        message: 'Local storage is not available. This may affect authentication.'
      });
    }

    // 3. Check if cookies are enabled
    results.push({
      name: 'Cookies',
      status: navigator.cookieEnabled ? 'success' : 'error',
      message: navigator.cookieEnabled 
        ? 'Cookies are enabled' 
        : 'Cookies are disabled. This will prevent authentication from working.'
    });

    // 4. Additional checks for specific error patterns
    const url = new URL(window.location.href);
    if (url.searchParams.has('error')) {
      const errorCode = url.searchParams.get('error');
      results.push({
        name: 'Authentication Error',
        status: 'error',
        message: `Error detected: ${errorCode}. This may indicate an authentication configuration issue.`
      });
    }

    // 5. Add a hint for Supabase authentication
    if (window.location.pathname === '/sign-in' || window.location.pathname === '/sign-up') {
      results.push({
        name: 'Authentication Configuration',
        status: 'warning',
        message: 'If you are consistently failing to authenticate, ensure that your Supabase project has proper Site URL and Redirect URL configuration.'
      });
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-md flex items-center">
          <WifiOff className="h-5 w-5 mr-2" />
          Network Troubleshooter
        </CardTitle>
        <CardDescription>
          Diagnose and resolve connection issues affecting authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        {networkStatus === 'offline' ? (
          <Alert variant="destructive" className="mb-4">
            <WifiOff className="h-4 w-4" />
            <AlertTitle>Network Error</AlertTitle>
            <AlertDescription>
              You are currently offline. Please check your internet connection and try again.
            </AlertDescription>
          </Alert>
        ) : testResults.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Run the network diagnostics to check for potential issues affecting your connection.
          </p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <Alert key={index} variant={result.status === 'error' ? 'destructive' : 'default'}>
                {result.status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : result.status === 'warning' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{result.name}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={runNetworkDiagnostics} 
          disabled={isRunningTests}
        >
          {isRunningTests ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Network Diagnostics
            </>
          )}
        </Button>
        <Button 
          onClick={onRetryConnection}
          disabled={networkStatus === 'online' && testResults.every(r => r.status === 'success')}
        >
          Retry Connection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionTroubleshooter;
