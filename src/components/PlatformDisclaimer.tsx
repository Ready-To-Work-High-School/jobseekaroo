
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const PlatformDisclaimer = () => {
  return (
    <div className="container mx-auto px-4 mb-8">
      <Alert 
        variant="default" 
        className="bg-secondary/30 border-secondary border-2 shadow-md rounded-lg relative overflow-hidden"
      >
        {/* Accent line on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        
        <div className="pl-4">
          <AlertCircle className="h-4 w-4 text-foreground mr-2" />
          <AlertDescription className="text-foreground font-medium">
            Note: This platform is exclusively for Westside High School students, educators, and partnering employers.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default PlatformDisclaimer;
