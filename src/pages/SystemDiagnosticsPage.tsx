
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { DiagnosticPanel } from '@/components/ErrorRecovery/DiagnosticPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { RefreshCcw, ArrowLeft, Trash2, BadgeHelp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useDiagnosticService } from '@/components/ErrorRecovery/diagnosticService';
import { toast } from 'sonner';

// Improved error tracking
const getSessionErrors = () => {
  try {
    const errors = sessionStorage.getItem('app_errors');
    return errors ? JSON.parse(errors) : [];
  } catch (e) {
    return [];
  }
};

const clearSessionErrors = () => {
  try {
    sessionStorage.setItem('app_errors', JSON.stringify([]));
  } catch (e) {
    console.error('Failed to clear session errors:', e);
  }
};

const SystemDiagnosticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);
  const [errors, setErrors] = useState(getSessionErrors());
  const { runDiagnostics, isRunning } = useDiagnosticService();
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  
  // Run diagnostics when page loads
  useEffect(() => {
    const runInitialDiagnostics = async () => {
      try {
        const results = await runDiagnostics();
        setDiagnosticResults(results);
        
        if (results.issues.length > 0) {
          toast({
            title: `${results.issues.length} issue(s) detected`,
            description: "See details below for more information",
            variant: "destructive",
          });
        } else {
          toast({
            title: "All systems operational",
            description: "No issues detected",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('Failed to run diagnostics:', error);
      }
    };
    
    runInitialDiagnostics();
    
    // Update errors from session storage
    setErrors(getSessionErrors());
  }, [refreshKey, runDiagnostics, toast]);
  
  const handleClearErrors = () => {
    clearSessionErrors();
    setErrors([]);
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Logs cleared",
      description: "All error logs have been cleared",
    });
  };

  const handleRunDiagnostics = async () => {
    try {
      const results = await runDiagnostics();
      setDiagnosticResults(results);
      
      if (results.issues.length > 0) {
        toast.error(`${results.issues.length} issue(s) detected`);
      } else {
        toast.success("All systems operational");
      }
    } catch (error) {
      console.error('Failed to run diagnostics:', error);
      toast.error("Failed to run diagnostics");
    }
  };

  const handleFixProfile = async () => {
    try {
      const { data: profilesExist } = await fetch('/api/check-profile-table');
      
      if (!profilesExist) {
        toast.error("Profile table doesn't exist or is inaccessible");
        return;
      }
      
      // Attempt to refresh the session and clear profile cache
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('supabase.auth.token');
      
      // Redirect to trigger reauthorization
      toast.success("Profile cache cleared, refreshing authentication...");
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1500);
    } catch (error) {
      console.error('Error fixing profile:', error);
      toast.error("Failed to fix profile issues");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">System Diagnostics</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRefreshKey(prev => prev + 1)}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="diagnostics">
              <TabsList className="mb-4">
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                <TabsTrigger value="errors">
                  Error Logs {errors.length > 0 && `(${errors.length})`}
                </TabsTrigger>
                <TabsTrigger value="fixes">Common Fixes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="diagnostics">
                <DiagnosticPanel showDetails key={refreshKey} />
                
                <div className="mt-6">
                  <Button 
                    onClick={handleRunDiagnostics}
                    disabled={isRunning}
                    className="w-full"
                  >
                    {isRunning ? 'Running Diagnostics...' : 'Run Full System Diagnostics'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="errors">
                <Card className="p-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Recent Errors</h3>
                    {errors.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleClearErrors}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear logs
                      </Button>
                    )}
                  </div>
                  
                  {errors.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No errors recorded in this session
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {errors.map((error, index) => (
                        <div key={index} className="p-3 border rounded-md bg-muted/20">
                          <p className="font-medium text-destructive">{error.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(error.timestamp).toLocaleString()}</p>
                          {error.componentStack && (
                            <details className="mt-2">
                              <summary className="text-sm cursor-pointer">Component stack</summary>
                              <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-[100px]">
                                {error.componentStack}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="fixes">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Common Fixes</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium flex items-center">
                        <BadgeHelp className="h-4 w-4 mr-2 text-blue-500" />
                        Profile Issues
                      </h4>
                      <p className="text-sm text-muted-foreground my-2">
                        If you're experiencing issues with your profile not showing, or profile data not loading correctly.
                      </p>
                      <Button onClick={handleFixProfile} size="sm">
                        Fix Profile Issues
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium flex items-center">
                        <BadgeHelp className="h-4 w-4 mr-2 text-blue-500" />
                        Clear Local Data
                      </h4>
                      <p className="text-sm text-muted-foreground my-2">
                        Clears all locally stored data, which can resolve various caching issues.
                      </p>
                      <Button 
                        size="sm"
                        onClick={() => {
                          try {
                            localStorage.clear();
                            sessionStorage.clear();
                            toast.success("Local data cleared successfully");
                            setTimeout(() => window.location.reload(), 1000);
                          } catch (e) {
                            console.error('Error clearing data:', e);
                            toast.error("Failed to clear local data");
                          }
                        }}
                      >
                        Clear All Local Data
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium flex items-center">
                        <BadgeHelp className="h-4 w-4 mr-2 text-blue-500" />
                        Authentication Reset
                      </h4>
                      <p className="text-sm text-muted-foreground my-2">
                        Signs you out and clears all authentication data.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          localStorage.removeItem('supabase.auth.token');
                          sessionStorage.removeItem('supabase.auth.token');
                          toast.success("Authentication reset, redirecting...");
                          setTimeout(() => {
                            window.location.href = '/sign-in';
                          }, 1000);
                        }}
                      >
                        Reset Authentication
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-medium mb-4">System Status</h3>
              <SystemStatusDisplay />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// System status display component
const SystemStatusDisplay: React.FC = () => {
  // In a real app, we would fetch this data from a backend service
  const [status] = useState({
    online: navigator.onLine,
    authStatus: true,
    dataStatus: true,
    lastCheck: new Date().toLocaleTimeString()
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Network connection</span>
        <StatusIndicator status={status.online} />
      </div>
      <div className="flex justify-between items-center">
        <span>Authentication service</span>
        <StatusIndicator status={status.authStatus} />
      </div>
      <div className="flex justify-between items-center">
        <span>Database connection</span>
        <StatusIndicator status={status.dataStatus} />
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t text-xs text-muted-foreground">
        <span>Last checked</span>
        <span>{status.lastCheck}</span>
      </div>
    </div>
  );
};

// Status indicator component
const StatusIndicator: React.FC<{ status: boolean }> = ({ status }) => {
  return (
    <div className="flex items-center">
      <div className={`
        h-2.5 w-2.5 rounded-full mr-2
        ${status ? 'bg-green-500' : 'bg-red-500'}
      `} />
      <span className={status ? 'text-green-600' : 'text-red-600'}>
        {status ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default SystemDiagnosticsPage;
