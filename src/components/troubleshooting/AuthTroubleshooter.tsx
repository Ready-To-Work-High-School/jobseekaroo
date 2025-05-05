
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, RefreshCw, WifiOff, HelpCircle } from 'lucide-react';
import { TroubleshootProps } from './types';
import NetworkOfflineState from '../auth/diagnostic/NetworkOfflineState';

interface DiagnosticResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
  fix?: () => void;
  fixLabel?: string;
}

const AuthTroubleshooter: React.FC<TroubleshootProps> = ({ trigger, initialIssue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    
    // Network connectivity check
    const networkResult: DiagnosticResult = {
      status: navigator.onLine ? 'success' : 'error',
      message: navigator.onLine ? 'Internet connection is available' : 'No internet connection detected',
      details: navigator.onLine ? 
        'Your device is currently connected to the internet.' : 
        'Authentication requires an active internet connection. Please check your network settings.',
      fix: navigator.onLine ? undefined : () => {
        window.location.reload();
      },
      fixLabel: 'Retry Connection'
    };
    
    setResults(prev => [...prev, networkResult]);
    
    // Local storage check
    try {
      localStorage.setItem('auth_test', 'test');
      const testValue = localStorage.getItem('auth_test');
      localStorage.removeItem('auth_test');
      
      const localStorageResult: DiagnosticResult = {
        status: testValue === 'test' ? 'success' : 'error',
        message: testValue === 'test' ? 'Local storage is working properly' : 'Local storage may be disabled',
        details: testValue === 'test' ? 
          'Authentication sessions can be stored locally.' : 
          'Authentication requires local storage to be enabled in your browser. Please check your privacy settings.'
      };
      
      setResults(prev => [...prev, localStorageResult]);
    } catch (error) {
      setResults(prev => [...prev, {
        status: 'error',
        message: 'Cannot access local storage',
        details: 'Your browser may have blocked access to local storage. This is often due to privacy settings or incognito mode.',
      }]);
    }
    
    // Cookie check
    const cookieEnabled = navigator.cookieEnabled;
    const cookieResult: DiagnosticResult = {
      status: cookieEnabled ? 'success' : 'error',
      message: cookieEnabled ? 'Cookies are enabled' : 'Cookies are disabled',
      details: cookieEnabled ? 
        'Authentication can store session data in cookies.' : 
        'Authentication requires cookies to be enabled in your browser. Please check your privacy settings.'
    };
    
    setResults(prev => [...prev, cookieResult]);
    
    // Browser compatibility check
    const userAgent = navigator.userAgent;
    const isModernBrowser = 
      (userAgent.includes('Chrome') && !userAgent.includes('Edg')) || 
      userAgent.includes('Firefox') || 
      userAgent.includes('Safari') && !userAgent.includes('Chrome');
    
    const browserResult: DiagnosticResult = {
      status: isModernBrowser ? 'success' : 'warning',
      message: isModernBrowser ? 'Using a modern supported browser' : 'Browser compatibility issues possible',
      details: isModernBrowser ? 
        'Your browser should work well with our authentication system.' : 
        'Some authentication features may not work correctly in your browser. We recommend using Chrome, Firefox, or Safari.'
    };
    
    setResults(prev => [...prev, browserResult]);
    
    setIsRunning(false);
  };

  if (isOffline) {
    return (
      <div className="mb-4">
        <NetworkOfflineState onRetry={() => setIsOffline(!navigator.onLine)} />
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="text-center mt-4 mb-6">
        {trigger ? (
          <div onClick={() => setIsOpen(true)}>{trigger}</div>
        ) : (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Having trouble signing in?</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="my-6 border-muted">
      <CardHeader>
        <CardTitle className="text-lg">Authentication Troubleshooter</CardTitle>
        <CardDescription>Diagnose and resolve common authentication issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center p-6">
            <p className="mb-4 text-muted-foreground">
              {initialIssue || "Having trouble signing in? Let's run a quick check to identify any issues."}
            </p>
            <Button onClick={runDiagnostics} disabled={isRunning}>
              {isRunning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running diagnostics...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Start Diagnostics
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, index) => (
              <Alert key={index} variant={result.status === 'error' ? 'destructive' : 'default'}>
                {result.status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : result.status === 'warning' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{result.message}</AlertTitle>
                {result.details && <AlertDescription>{result.details}</AlertDescription>}
                {result.fix && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={result.fix} 
                    className="mt-2"
                  >
                    {result.fixLabel || 'Fix Issue'}
                  </Button>
                )}
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {results.length > 0 && (
          <Button variant="outline" onClick={runDiagnostics} disabled={isRunning}>
            {isRunning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Again
              </>
            )}
          </Button>
        )}
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthTroubleshooter;
