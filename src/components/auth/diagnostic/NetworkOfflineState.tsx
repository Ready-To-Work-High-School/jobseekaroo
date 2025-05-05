
import React from 'react';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface NetworkOfflineStateProps {
  onRetry?: () => void;
}

const NetworkOfflineState: React.FC<NetworkOfflineStateProps> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default behavior if no callback provided
      window.location.reload();
    }
  };

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-red-600">
          <WifiOff className="mr-2 h-5 w-5" />
          Network Connection Issue
        </CardTitle>
        <CardDescription className="text-red-500">
          You appear to be offline
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-red-600">
        <p>
          Please check your internet connection and try again. You need to be online to use social authentication.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="gap-2 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
          onClick={handleRetry}
        >
          <WifiOff className="h-4 w-4" />
          Retry Connection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NetworkOfflineState;
