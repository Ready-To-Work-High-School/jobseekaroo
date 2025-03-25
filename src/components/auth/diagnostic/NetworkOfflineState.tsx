
import React from "react";
import { AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const NetworkOfflineState = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
      <div className="flex items-center gap-2 mb-2">
        <WifiOff className="h-5 w-5 text-amber-600" />
        <h3 className="font-medium">You appear to be offline</h3>
      </div>
      
      <p className="text-sm mb-3">
        An internet connection is required to sign in with Google or Apple.
        Please check your connection and try again.
      </p>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRetry}
          className="text-xs flex items-center gap-1.5"
        >
          <Wifi className="h-3.5 w-3.5" />
          Check Connection
        </Button>
        
        <div className="text-xs flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" />
          Network: Offline
        </div>
      </div>
    </div>
  );
};

export default NetworkOfflineState;
