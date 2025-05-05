
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

type DiagnosticResults = {
  issues: string[];
  automaticallyFixed: number;
};

export const useDiagnosticService = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResults | null>(null);

  // Run a series of diagnostic checks
  const runDiagnostics = useCallback(async (): Promise<DiagnosticResults> => {
    setIsRunning(true);
    const issues: string[] = [];
    let automaticallyFixed = 0;

    try {
      // Check 1: Test network connectivity
      try {
        const networkTest = await fetch('https://jsonplaceholder.typicode.com/posts/1', { 
          method: 'HEAD',
          mode: 'no-cors', 
          cache: 'no-cache' 
        });
        if (!networkTest.ok && networkTest.status !== 0) {
          issues.push('Network connectivity issue: Unable to reach external services');
        }
      } catch (error) {
        issues.push('Network connectivity issue: Unable to reach external services');
      }

      // Check 2: Test Supabase connectivity
      try {
        await supabase.from('profiles').select('id').limit(1);
      } catch (error) {
        issues.push('Database connectivity issue: Unable to connect to Supabase');
      }

      // Check 3: Test localStorage availability
      try {
        localStorage.setItem('diagnostics_test', 'test');
        localStorage.removeItem('diagnostics_test');
      } catch (error) {
        issues.push('Browser storage issue: localStorage is not available');
      }

      // Check 4: Test sessionStorage availability
      try {
        sessionStorage.setItem('diagnostics_test', 'test');
        sessionStorage.removeItem('diagnostics_test');
      } catch (error) {
        issues.push('Browser storage issue: sessionStorage is not available');
      }

      // Check 5: Check if authentication is working properly
      const { data: authData, error: authError } = await supabase.auth.getSession();
      if (authError) {
        issues.push('Authentication issue: Unable to retrieve session');
      }

      // Check 6: Check for memory issues
      if (window.performance && 'memory' in window.performance) {
        const memoryInfo = (window.performance as any).memory;
        if (memoryInfo && memoryInfo.usedJSHeapSize > 0.8 * memoryInfo.jsHeapSizeLimit) {
          issues.push('Performance issue: High memory usage detected');
        }
      }

      return {
        issues,
        automaticallyFixed
      };
    } catch (error) {
      console.error('Error during diagnostics:', error);
      return {
        issues: [...issues, 'Diagnostic process failed unexpectedly'],
        automaticallyFixed
      };
    } finally {
      setIsRunning(false);
    }
  }, []);

  // Apply fixes for common issues
  const applyFixes = useCallback(async (issues: string[]): Promise<number> => {
    let fixesApplied = 0;

    try {
      // Apply fix for each issue that can be automatically resolved
      for (const issue of issues) {
        if (issue.includes('localStorage') || issue.includes('sessionStorage')) {
          // Clear storage to fix potential corruption
          try {
            sessionStorage.clear();
            localStorage.clear();
            fixesApplied++;
            toast.success('Cleared browser storage');
          } catch (error) {
            console.error('Failed to clear storage:', error);
          }
        }

        if (issue.includes('Authentication issue')) {
          // Attempt to refresh the session
          try {
            await supabase.auth.refreshSession();
            fixesApplied++;
            toast.success('Refreshed authentication session');
          } catch (error) {
            console.error('Failed to refresh session:', error);
          }
        }
      }

      return fixesApplied;
    } catch (error) {
      console.error('Error applying fixes:', error);
      return fixesApplied;
    }
  }, []);

  return {
    isRunning,
    results,
    runDiagnostics,
    applyFixes,
    setResults
  };
};
