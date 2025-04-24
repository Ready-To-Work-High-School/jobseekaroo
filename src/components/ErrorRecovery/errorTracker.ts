
import { ErrorInfo } from 'react';

interface ErrorRecord {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

// Track errors in memory for the session
const errorRecords: ErrorRecord[] = [];
const MAX_MEMORY_RECORDS = 10;

// Track error in memory and optionally to remote storage
export const trackError = async (error: Error, errorInfo: ErrorInfo) => {
  // Create error record
  const errorRecord: ErrorRecord = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };
  
  // Add to in-memory storage for this session
  errorRecords.push(errorRecord);
  if (errorRecords.length > MAX_MEMORY_RECORDS) {
    errorRecords.shift(); // Remove oldest error if we exceed limit
  }

  // Log to console for development
  console.group('Error tracked:');
  console.error(error);
  console.info('Component stack:', errorInfo.componentStack);
  console.groupEnd();

  // If we're in production, we would log to a database
  // But since we don't have the error_logs table, we'll just
  // log to console for now
  if (process.env.NODE_ENV === 'production') {
    try {
      console.log('Would save error to database:', errorRecord);
      // Original code removed as error_logs table doesn't exist
    } catch (logError) {
      console.error('Error while logging error:', logError);
    }
  }

  // Return record for potential further processing
  return errorRecord;
};

// Get errors for current session
export const getSessionErrors = (): ErrorRecord[] => {
  return [...errorRecords];
};

// Clear session errors
export const clearSessionErrors = (): void => {
  errorRecords.length = 0;
};

// Automatically detect potential error-causing states
export const detectPotentialIssues = (): string[] => {
  const issues: string[] = [];
  
  // Check for memory issues
  if (window.performance && 'memory' in window.performance) {
    const memory = (window.performance as any).memory;
    if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
      issues.push('High memory usage detected');
    }
  }
  
  // Network connectivity issues
  if (!navigator.onLine) {
    issues.push('No internet connection');
  }
  
  // Check for slow response times
  if (window.performance && performance.timing) {
    const navTiming = performance.timing;
    const pageLoadTime = navTiming.loadEventEnd - navTiming.navigationStart;
    if (pageLoadTime > 5000) { // 5 seconds
      issues.push('Slow page load time detected');
    }
  }
  
  return issues;
};
