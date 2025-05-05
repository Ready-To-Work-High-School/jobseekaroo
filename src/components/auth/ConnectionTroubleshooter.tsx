
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, WifiOff, CheckCircle, RefreshCw, Wifi, ExternalLink } from 'lucide-react';

interface ConnectionTroubleshooterProps {
  onRetryConnection: () => void;
}

const ConnectionTroubleshooter: React.FC<ConnectionTroubleshooterProps> = ({ onRetryConnection }) => {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    name: string;
    status: 'success' | 'error' | 'warning';
    message: string;
    resolution?: string;
  }>>([]);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );
  const [lastTestTime, setLastTestTime] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      setLastOnlineTime(new Date());
    };
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Run tests automatically on load
    runNetworkDiagnostics();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-refresh tests when network status changes
  useEffect(() => {
    if (networkStatus === 'online' && lastOnlineTime) {
      // Wait a short delay to let network stabilize
      const timer = setTimeout(() => {
        runNetworkDiagnostics();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [networkStatus, lastOnlineTime]);

  const pingEndpoint = async (): Promise<boolean> => {
    try {
      // Use a highly available endpoint to test connection
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      console.error('Ping test failed:', error);
      return false;
    }
  };

  const runNetworkDiagnostics = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    const results = [];

    // 1. Check basic network connectivity
    const isOnline = navigator.onLine;
    results.push({
      name: 'Internet Connection',
      status: isOnline ? 'success' : 'error',
      message: isOnline 
        ? 'Your device reports it is connected to the internet' 
        : 'Your device reports it is not connected to the internet',
      resolution: isOnline ? undefined : 'Check your Wi-Fi or cellular connection and try again'
    });

    // 2. Perform an actual connection test if browser reports online
    if (isOnline) {
      const canReachEndpoint = await pingEndpoint();
      results.push({
        name: 'Connection Test',
        status: canReachEndpoint ? 'success' : 'error',
        message: canReachEndpoint 
          ? 'Successfully connected to remote server' 
          : 'Could not reach remote server despite being "online"',
        resolution: canReachEndpoint ? undefined : 'Your connection may be behind a firewall or proxy. Try using a different network.'
      });
    }

    // 3. Check for cookie and local storage support
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
        message: 'Local storage is not available. This may affect authentication.',
        resolution: 'Try disabling private browsing or incognito mode'
      });
    }

    // 4. Check if cookies are enabled
    results.push({
      name: 'Cookies',
      status: navigator.cookieEnabled ? 'success' : 'error',
      message: navigator.cookieEnabled 
        ? 'Cookies are enabled' 
        : 'Cookies are disabled. This will prevent authentication from working.',
      resolution: navigator.cookieEnabled ? undefined : 'Enable cookies in your browser settings'
    });

    // 5. Additional checks for specific error patterns
    const url = new URL(window.location.href);
    if (url.searchParams.has('error')) {
      const errorCode = url.searchParams.get('error');
      results.push({
        name: 'Authentication Error',
        status: 'error',
        message: `Error detected: ${errorCode}. This may indicate an authentication configuration issue.`,
        resolution: 'Try clearing your browser cache or using an incognito window'
      });
    }

    setTestResults(results);
    setLastTestTime(new Date());
    setIsRunningTests(false);
  };

  const handleForceRetry = () => {
    // More aggressive reload
    window.location.href = window.location.pathname;
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-md flex items-center">
          {networkStatus === 'online' ? (
            <Wifi className="h-5 w-5 mr-2 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 mr-2 text-red-500" />
          )}
          Connection Troubleshooter
        </CardTitle>
        <CardDescription>
          {networkStatus === 'online' 
            ? 'Diagnose and resolve authentication connection issues' 
            : 'You appear to be offline. Please check your internet connection.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {networkStatus === 'offline' ? (
          <Alert variant="destructive" className="mb-4">
            <WifiOff className="h-4 w-4" />
            <AlertTitle>Network Error</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>You are currently offline. Please check your internet connection and try again.</p>
              <div className="space-y-1 text-sm mt-2">
                <p>Try these steps:</p>
                <ol className="list-decimal list-inside">
                  <li>Check your Wi-Fi or cellular connection</li>
                  <li>Disable airplane mode if it's on</li>
                  <li>Try a different network if available</li>
                  <li>Restart your router if needed</li>
                </ol>
              </div>
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
                <AlertDescription className="space-y-1">
                  <p>{result.message}</p>
                  {result.resolution && (
                    <p className="text-sm font-medium mt-1">
                      Solution: {result.resolution}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            ))}
            
            {lastTestTime && (
              <p className="text-xs text-muted-foreground text-right mt-2">
                Last test: {lastTestTime.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex justify-between w-full">
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
                Run Diagnostics
              </>
            )}
          </Button>
          <Button 
            onClick={onRetryConnection}
            disabled={networkStatus === 'online' && testResults.every(r => r.status === 'success')}
          >
            Retry Connection
          </Button>
        </div>
        
        {/* Advanced options for persistent issues */}
        {(testResults.some(r => r.status === 'error') || networkStatus === 'offline') && (
          <div className="w-full pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-2">Advanced Options:</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleForceRetry}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Force Reload Page
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/sign-in?bypass=network'}
              >
                Bypass Network Check
              </Button>
              
              <a 
                href="https://downdetector.com/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Check Service Status
                </Button>
              </a>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ConnectionTroubleshooter;
