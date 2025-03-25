
import React, { useState, useEffect } from "react";
import { AlertTriangle, Wifi, WifiOff, RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const NetworkOfflineState = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [googleStatus, setGoogleStatus] = useState<"checking" | "reachable" | "unreachable">("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  
  // Check if specific domains are reachable
  const checkConnectivity = async () => {
    setIsChecking(true);
    setGoogleStatus("checking");
    
    try {
      // Try to fetch Google's status endpoint with no-cors mode
      await fetch('https://accounts.google.com/gsi/status', { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      console.log("Google connectivity test passed");
      setGoogleStatus("reachable");
    } catch (err) {
      console.error("Google connectivity test failed:", err);
      setGoogleStatus("unreachable");
    } finally {
      setIsChecking(false);
      setLastChecked(new Date());
    }
  };
  
  useEffect(() => {
    // Check connectivity on mount
    checkConnectivity();
  }, []);

  const handleRetry = () => {
    // Check connectivity and then reload if successful
    checkConnectivity().then(() => {
      if (googleStatus === "reachable") {
        window.location.reload();
      }
    });
  };
  
  const handleRefreshOnly = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white border rounded-md shadow-sm p-5 text-left max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-3">
        {navigator.onLine ? (
          <Wifi className="h-5 w-5 text-amber-500" />
        ) : (
          <WifiOff className="h-5 w-5 text-red-500" />
        )}
        <h3 className="font-medium">
          {navigator.onLine 
            ? "Connection Issue Detected" 
            : "You appear to be offline"}
        </h3>
      </div>
      
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>
          {googleStatus === "unreachable" 
            ? "Unable to connect to Google services" 
            : "Connection problem detected"}
        </AlertTitle>
        <AlertDescription className="text-sm mt-1">
          {googleStatus === "unreachable" 
            ? "This application needs to connect to accounts.google.com for authentication services."
            : "Your browser is reporting network connectivity issues."}
        </AlertDescription>
      </Alert>
      
      <p className="text-sm mb-4">
        {navigator.onLine
          ? "While your internet appears to be working, we couldn't connect to all required services. This could be due to network restrictions, firewall settings, or proxy configurations."
          : "An internet connection is required to sign in and use this application. Please check your connection and try again."}
      </p>
      
      <div className="space-y-2">
        <Button 
          variant="default" 
          size="sm"
          onClick={handleRetry}
          disabled={isChecking}
          className="w-full flex items-center justify-center gap-2"
        >
          {isChecking ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {isChecking ? "Checking Connection..." : "Check Connection & Reload"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefreshOnly}
          className="w-full"
        >
          Reload Page Only
        </Button>
      </div>
      
      {googleStatus !== "checking" && (
        <div className="mt-4 text-xs text-gray-500 flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Network:</span> 
            <span className={navigator.onLine ? "text-green-600" : "text-red-600"}>
              {navigator.onLine ? "Online" : "Offline"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Google Services:</span> 
            <span className={googleStatus === "reachable" ? "text-green-600" : "text-red-600"}>
              {googleStatus === "reachable" ? "Reachable" : "Unreachable"}
            </span>
          </div>
          
          {lastChecked && (
            <div className="flex justify-between">
              <span>Last checked:</span>
              <span>{lastChecked.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NetworkOfflineState;
