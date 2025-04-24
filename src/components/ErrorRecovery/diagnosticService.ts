
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getSessionErrors, detectPotentialIssues } from './errorTracker';

export const useDiagnosticService = () => {
  const { toast } = useToast();
  
  // Run all diagnostic tests
  const runDiagnostics = useCallback(async () => {
    toast({
      title: "Running diagnostics",
      description: "Checking for potential issues...",
    });

    // Collect potential issues
    const potentialIssues = detectPotentialIssues();
    const recentErrors = getSessionErrors();
    
    // Analyze collected data
    const results = await analyzeDiagnostics(potentialIssues, recentErrors);
    
    // Show diagnostic results
    if (results.issues.length === 0) {
      toast({
        title: "Diagnostic complete",
        description: "No issues detected",
      });
    } else {
      toast({
        title: "Issues detected",
        description: `Found ${results.issues.length} issue(s). ${results.automaticallyFixed} fixed automatically.`,
        variant: "destructive",
      });
    }
    
    return results;
  }, [toast]);
  
  // Auto-fix common issues
  const applyFixes = useCallback(async (issues: string[]) => {
    let fixesApplied = 0;
    
    for (const issue of issues) {
      if (await tryFixIssue(issue)) {
        fixesApplied++;
      }
    }
    
    if (fixesApplied > 0) {
      toast({
        title: "Fixes applied",
        description: `${fixesApplied} issue(s) have been fixed`,
      });
    }
    
    return fixesApplied;
  }, [toast]);
  
  return {
    runDiagnostics,
    applyFixes
  };
};

// Analyze diagnostic data and apply automatic fixes where possible
async function analyzeDiagnostics(
  potentialIssues: string[],
  recentErrors: any[]
): Promise<{ issues: string[]; automaticallyFixed: number }> {
  const issues = [...potentialIssues];
  
  // Add issues from recent errors
  recentErrors.forEach(error => {
    if (error.message) {
      // Only add unique error messages
      if (!issues.some(issue => issue.includes(error.message))) {
        issues.push(`Error: ${error.message}`);
      }
    }
  });
  
  // Try to automatically fix issues
  let automaticallyFixed = 0;
  for (const issue of [...issues]) {
    if (await tryFixIssue(issue)) {
      automaticallyFixed++;
      // Remove from issues list if fixed
      const index = issues.indexOf(issue);
      if (index > -1) {
        issues.splice(index, 1);
      }
    }
  }
  
  return { issues, automaticallyFixed };
}

// Try to fix common issues automatically
async function tryFixIssue(issue: string): Promise<boolean> {
  // Implement common fixes here
  if (issue.includes('No internet connection')) {
    // Can't fix connectivity, but can notify user
    return false;
  }
  
  // Memory issues
  if (issue.includes('High memory usage detected')) {
    // Try to free some memory
    try {
      if (window.gc) {
        (window as any).gc();
        return true;
      }
    } catch (e) {
      console.error("Failed to run garbage collection:", e);
    }
    return false;
  }

  // Local storage issues
  if (issue.includes('storage quota exceeded')) {
    try {
      // Clear non-essential storage
      localStorage.removeItem('debug_logs');
      sessionStorage.clear();
      return true;
    } catch (e) {
      console.error("Failed to clear storage:", e);
      return false;
    }
  }
  
  return false;
}
