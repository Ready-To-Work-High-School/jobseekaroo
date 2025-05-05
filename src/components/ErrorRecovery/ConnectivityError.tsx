
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, RefreshCw } from 'lucide-react';

interface ConnectivityErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
  errorMessage?: string;
}

const ConnectivityError: React.FC<ConnectivityErrorProps> = ({
  onRetry,
  isRetrying = false,
  errorMessage = "There was a problem connecting to the database. This could be due to network issues or server problems."
}) => {
  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader className="text-center">
        <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <WifiOff className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle>Connection Error</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-700 mb-4">{errorMessage}</p>
        <div className="space-y-2 text-sm">
          <p className="font-medium">Troubleshooting tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your internet connection</li>
            <li>Make sure you're not using a VPN or proxy that might block the connection</li>
            <li>Try refreshing the page</li>
            <li>If the problem persists, try again later as the server might be temporarily unavailable</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Connection
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectivityError;
