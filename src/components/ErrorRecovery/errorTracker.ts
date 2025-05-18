
// Store session errors in memory
let sessionErrors: Array<{
  message: string;
  timestamp: number;
  componentStack?: string;
}> = [];

// Max number of errors to keep
const MAX_ERRORS = 50;

/**
 * Track a new error in the session
 * @param error Error object or error message
 * @param errorInfo Optional component stack for React errors or other error information
 */
export const trackError = (
  error: Error | string,
  errorInfo?: React.ErrorInfo | string
) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  // Extract component stack from errorInfo
  let componentStack: string | undefined;
  if (errorInfo) {
    if (typeof errorInfo === 'string') {
      componentStack = errorInfo;
    } else if (errorInfo.componentStack) {
      componentStack = errorInfo.componentStack;
    }
  }
  
  // Add the error to our session tracking
  sessionErrors.unshift({
    message: errorMessage,
    timestamp: Date.now(),
    componentStack
  });
  
  // Keep the list at a reasonable size
  if (sessionErrors.length > MAX_ERRORS) {
    sessionErrors = sessionErrors.slice(0, MAX_ERRORS);
  }
  
  // Log to console for debugging
  console.error('Error tracked:', errorMessage);
  
  return sessionErrors[0];
};

/**
 * Get all errors tracked in this session
 * @returns Array of tracked errors
 */
export const getSessionErrors = () => {
  return [...sessionErrors];
};

/**
 * Clear all tracked errors in the session
 */
export const clearSessionErrors = () => {
  sessionErrors = [];
  return true;
};

/**
 * Check for potential issues based on current application state
 * @returns Array of potential issues detected
 */
export const detectPotentialIssues = () => {
  const issues: string[] = [];
  
  // Check for network connectivity
  if (!navigator.onLine) {
    issues.push('No internet connection');
  }
  
  // Check for high memory usage
  if ('memory' in window.performance) {
    const memoryInfo = (window.performance as any).memory;
    if (memoryInfo?.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) {
      issues.push('High memory usage detected');
    }
  }
  
  // Check local storage
  try {
    // Check if localStorage is accessible
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('diagnostic_test', 'test');
      localStorage.removeItem('diagnostic_test');
    }
  } catch (e) {
    issues.push('Local storage not available or quota exceeded');
  }
  
  return issues;
};
