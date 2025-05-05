
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, AlertCircle, RefreshCw, Cpu, Wifi, Database, RadioTower } from 'lucide-react';
import { useDiagnosticService } from '@/components/ErrorRecovery/diagnosticService';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const SystemDiagnosticsPage = () => {
  const { user } = useAuth();
  const { runDiagnostics, applyFixes } = useDiagnosticService();
  const [isRunning, setIsRunning] = useState(false);
  const [issues, setIssues] = useState<string[]>([]);
  const [networkLatency, setNetworkLatency] = useState<number | null>(null);
  const [databaseHealth, setDatabaseHealth] = useState<'good' | 'degraded' | 'error' | 'unknown'>('unknown');
  const [lastRun, setLastRun] = useState<Date | null>(null);
  const [isFixing, setIsFixing] = useState(false);
  const [autoFixCount, setAutoFixCount] = useState(0);
  const [supabaseStatus, setSupabaseStatus] = useState<'online' | 'offline' | 'degraded' | 'unknown'>('unknown');
  const [memoryUsage, setMemoryUsage] = useState<string | null>(null);

  // Run diagnostics and perform health checks
  const handleRunDiagnostics = async () => {
    setIsRunning(true);
    
    try {
      // Check network latency
      const startTime = performance.now();
      
      try {
        await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'HEAD' });
        const endTime = performance.now();
        setNetworkLatency(Math.round(endTime - startTime));
      } catch (err) {
        setNetworkLatency(null);
        console.error("Network test failed:", err);
      }

      // Check Supabase connectivity
      try {
        await checkSupabase();
      } catch (err) {
        console.error("Supabase check failed:", err);
      }

      // Check memory usage if available
      if (window.performance && 'memory' in window.performance) {
        const mem = (window.performance as any).memory;
        if (mem) {
          const usedMemory = Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100);
          setMemoryUsage(`${usedMemory}% (${formatBytes(mem.usedJSHeapSize)} / ${formatBytes(mem.jsHeapSizeLimit)})`);
        }
      }

      // Run the comprehensive diagnostics
      const results = await runDiagnostics();
      
      if (results) {
        setIssues(results.issues);
        setAutoFixCount(results.automaticallyFixed);
        toast.error(`Found ${results.issues.length} issues. ${results.automaticallyFixed} auto-fixed.`);
        
        if (results.issues.length === 0) {
          toast.success("No issues detected! Your system is running smoothly.");
        }
      }

      setLastRun(new Date());
    } catch (err) {
      console.error("Diagnostic failed:", err);
      toast.error("Diagnostics failed to complete");
    } finally {
      setIsRunning(false);
    }
  };

  // Check Supabase connectivity and health
  const checkSupabase = async () => {
    try {
      const startTime = performance.now();
      const { data, error } = await supabase.from('profiles').select('id').limit(1);
      const endTime = performance.now();
      
      if (error) {
        console.error("Supabase error:", error);
        setSupabaseStatus('error');
        setDatabaseHealth('error');
        toast.error("Database connection error detected");
        return;
      }

      // Check response time to determine performance
      const responseTime = endTime - startTime;
      if (responseTime > 1000) {
        setSupabaseStatus('degraded');
        setDatabaseHealth('degraded');
      } else {
        setSupabaseStatus('online');
        setDatabaseHealth('good');
      }
    } catch (err) {
      console.error("Supabase check failed:", err);
      setSupabaseStatus('offline');
      setDatabaseHealth('error');
      toast.error("Cannot reach database service");
    }
  };

  // Apply fixes for detected issues
  const handleApplyFixes = async () => {
    if (issues.length === 0) {
      toast.success("No issues to fix");
      return;
    }
    
    setIsFixing(true);
    
    try {
      const fixCount = await applyFixes(issues);
      toast.success(`Applied ${fixCount} fixes successfully`);
      
      // Refresh the issues list if fixes were applied
      if (fixCount > 0) {
        setIssues(prev => prev.filter((_, index) => index >= fixCount));
      }
    } catch (err) {
      console.error("Fix application failed:", err);
      toast.error("Failed to apply fixes");
    } finally {
      setIsFixing(false);
    }
  };

  // Try clearing browser storage
  const handleClearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Browser storage cleared successfully");
    } catch (err) {
      console.error("Failed to clear storage:", err);
      toast.error("Failed to clear browser storage");
    }
  };
  
  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  useEffect(() => {
    // Run initial quick check on component mount
    checkSupabase();
    
    // Detect memory usage if available
    if (window.performance && 'memory' in window.performance) {
      const mem = (window.performance as any).memory;
      if (mem) {
        const usedMemory = Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100);
        setMemoryUsage(`${usedMemory}% (${formatBytes(mem.usedJSHeapSize)} / ${formatBytes(mem.jsHeapSizeLimit)})`);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">System Diagnostics</h1>
        
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                System Health Check
              </CardTitle>
              <CardDescription>
                Check the status of your system and fix common issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-2 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Network</h3>
                    <Badge variant={networkLatency === null ? "destructive" : networkLatency > 300 ? "outline" : "default"}>
                      {networkLatency === null ? "Offline" : networkLatency > 300 ? "Slow" : "Good"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    {networkLatency === null ? "Cannot reach internet" : `${networkLatency}ms latency`}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Database</h3>
                    <Badge variant={
                      databaseHealth === 'unknown' ? "secondary" :
                      databaseHealth === 'good' ? "default" :
                      databaseHealth === 'degraded' ? "outline" : "destructive"
                    }>
                      {databaseHealth === 'unknown' ? "Unknown" :
                       databaseHealth === 'good' ? "Healthy" :
                       databaseHealth === 'degraded' ? "Degraded" : "Error"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    {supabaseStatus === 'unknown' ? "Not checked" :
                     supabaseStatus === 'online' ? "Connected" :
                     supabaseStatus === 'degraded' ? "Slow response" : "Cannot connect"}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Memory Usage</h3>
                    <Badge variant={
                      !memoryUsage ? "secondary" :
                      memoryUsage.startsWith('8') || memoryUsage.startsWith('9') ? "destructive" :
                      memoryUsage.startsWith('7') ? "outline" : "default"
                    }>
                      {!memoryUsage ? "Unknown" :
                       memoryUsage.startsWith('8') || memoryUsage.startsWith('9') ? "High" :
                       memoryUsage.startsWith('7') ? "Moderate" : "Good"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <RadioTower className="h-4 w-4" />
                    {memoryUsage || "Not available"}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Diagnostic Results</h3>
                    {lastRun && (
                      <p className="text-sm text-muted-foreground">
                        Last run: {lastRun.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <Button 
                    onClick={handleRunDiagnostics} 
                    disabled={isRunning}
                    className="flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        Run Diagnostics
                      </>
                    )}
                  </Button>
                </div>
                
                {autoFixCount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Auto-fixed {autoFixCount} issue(s)</p>
                      <p className="text-green-700 mt-1">Some issues were automatically resolved</p>
                    </div>
                  </div>
                )}
                
                {issues.length > 0 ? (
                  <div>
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">
                            {issues.length} issue{issues.length > 1 ? 's' : ''} detected
                          </p>
                          <p className="text-amber-700 mt-1">
                            The following issues might affect your experience
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {issues.map((issue, i) => (
                        <li key={i} className="p-3 bg-slate-50 border rounded-md flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : lastRun ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">All systems operational</p>
                      <p className="text-green-700 mt-1">No issues detected in your application</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={handleClearStorage}
              >
                Clear Browser Storage
              </Button>
              
              <Button 
                onClick={handleApplyFixes} 
                disabled={isFixing || issues.length === 0}
                className="flex items-center gap-2"
              >
                {isFixing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Apply Fixes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Common Fixes</CardTitle>
              <CardDescription>
                Try these solutions for common issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Authentication Issues</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're experiencing issues with logging in or account access
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      signOut().then(() => {
                        toast.success("Signed out successfully. Please sign in again.");
                        navigate('/sign-in');
                      }).catch(err => {
                        toast.error("Error signing out. Please try again.");
                      });
                    }}
                    className="w-full"
                  >
                    Sign Out & Clear Session
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Application Data Issues</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If job listings, applications, or user data isn't loading correctly
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    Clear Cache & Reload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SystemDiagnosticsPage;
