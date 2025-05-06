
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState<Error | null>(null);
  const { isOnline } = useNetworkStatus();
  
  useEffect(() => {
    // Get error information from window.history.state
    const errorState = window.history.state?.error;
    if (errorState) {
      setErrorDetails(errorState);
      console.error('Error details:', errorState);
    }
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    // Attempt to go back to the previous page
    navigate(-1);
  };

  const handleDiagnostics = () => {
    navigate('/system-diagnostics');
    toast.info("Running system diagnostics...");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto border-red-200 shadow-lg">
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <CardTitle className="text-2xl">
                {!isOnline ? 'No Internet Connection' : 'Oops! Something went wrong'}
              </CardTitle>
            </div>
            {!isOnline && (
              <div className="flex items-center gap-2 mt-2 text-red-500">
                <WifiOff className="h-5 w-5" />
                <span className="text-sm">You're currently offline</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-8">
              {!isOnline
                ? "We can't connect to the internet right now. Please check your connection and try again."
                : "We're sorry, but there was an error processing your request."
              }
            </p>
            
            {isOnline && errorDetails && (
              <div className="bg-slate-50 p-4 rounded-md mb-6 border border-slate-200">
                <p className="font-medium text-red-600">{errorDetails.message}</p>
                {errorDetails.stack && (
                  <details className="mt-2">
                    <summary className="text-sm cursor-pointer text-slate-500">Technical details</summary>
                    <pre className="mt-2 text-xs bg-slate-100 p-2 rounded overflow-auto max-h-[200px]">
                      {errorDetails.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleGoHome} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
              <Button onClick={handleTryAgain} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                {!isOnline ? "Retry Connection" : "Try Again"}
              </Button>
              {isOnline && (
                <Button onClick={handleDiagnostics} variant="ghost" className="flex items-center gap-2">
                  Run Diagnostics
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ErrorPage;
