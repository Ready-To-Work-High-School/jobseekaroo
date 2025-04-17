
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We're sorry, but an unexpected error has occurred. Please try refreshing the page.
        </p>
        <Button onClick={handleRefresh}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
