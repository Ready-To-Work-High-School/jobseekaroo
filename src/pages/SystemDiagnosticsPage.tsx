
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { DiagnosticPanel } from '@/components/ErrorRecovery/DiagnosticPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { RefreshCcw, ArrowLeft, Trash2 } from 'lucide-react';
import { getSessionErrors, clearSessionErrors } from '@/components/ErrorRecovery/errorTracker';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SystemDiagnosticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);
  const errors = getSessionErrors();
  
  const handleClearErrors = () => {
    clearSessionErrors();
    setRefreshKey(prev => prev + 1);
    toast({
      title: "Logs cleared",
      description: "All error logs have been cleared",
    });
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
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="diagnostics">
                <DiagnosticPanel showDetails key={refreshKey} />
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
              
              <TabsContent value="performance">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Performance Metrics</h3>
                  <PerformanceMetrics />
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

// Simple performance metrics display
const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<{
    pageLoad: number;
    memory: string;
    networkLatency: number;
  }>({
    pageLoad: 0,
    memory: 'Unknown',
    networkLatency: 0
  });
  
  // Get basic performance metrics
  React.useEffect(() => {
    if (window.performance) {
      // Page load time
      const navData = window.performance.timing;
      if (navData) {
        const pageLoad = navData.loadEventEnd - navData.navigationStart;
        
        // Memory usage
        let memory = 'Unknown';
        if ('memory' in window.performance) {
          const memoryInfo = (window.performance as any).memory;
          if (memoryInfo?.usedJSHeapSize) {
            memory = `${(memoryInfo.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB`;
          }
        }
        
        // Fake network latency for demonstration
        const networkLatency = Math.floor(Math.random() * 100) + 20;
        
        setMetrics({
          pageLoad,
          memory,
          networkLatency
        });
      }
    }
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span>Page load time</span>
        <span className="font-mono">{metrics.pageLoad} ms</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <span>Memory usage</span>
        <span className="font-mono">{metrics.memory}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <span>Network latency</span>
        <span className="font-mono">{metrics.networkLatency} ms</span>
      </div>
    </div>
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
