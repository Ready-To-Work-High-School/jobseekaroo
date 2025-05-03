
import { checkMissingLinks, checkCriticalComponents } from '../utils/componentChecker';

/**
 * Run all system diagnostic checks
 * @returns Array of detected issues
 */
export const runSystemDiagnostics = () => {
  // Check for UI components and navigation issues
  const linkIssues = checkMissingLinks();
  const componentIssues = checkCriticalComponents();
  
  // Check for performance issues
  const performanceIssues = checkPerformanceIssues();
  
  // Check for browser compatibility issues
  const compatibilityIssues = checkBrowserCompatibility();
  
  // Combine all issues
  return [...linkIssues, ...componentIssues, ...performanceIssues, ...compatibilityIssues];
};

/**
 * Check for potential performance issues
 * @returns Array of performance-related issues
 */
const checkPerformanceIssues = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check page load time
    if (window.performance) {
      const navData = window.performance.timing;
      if (navData) {
        const pageLoadTime = navData.loadEventEnd - navData.navigationStart;
        if (pageLoadTime > 3000) { // 3 seconds threshold
          issues.push(`Slow page load time: ${Math.round(pageLoadTime / 1000)} seconds`);
        }
      }
      
      // Check memory usage if available
      if ('memory' in window.performance) {
        const memoryInfo = (window.performance as any).memory;
        if (memoryInfo?.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.8) {
          issues.push('High memory usage detected');
        }
      }
    }
  } catch (error) {
    console.error("Error checking performance:", error);
  }
  
  return issues;
};

/**
 * Check for browser compatibility issues
 * @returns Array of compatibility-related issues
 */
const checkBrowserCompatibility = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check for older browsers
    const userAgent = navigator.userAgent;
    if (/MSIE|Trident/.test(userAgent)) {
      issues.push('Internet Explorer detected. Some features may not work correctly.');
    }
    
    // Check if localStorage is available
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      issues.push('Local storage is not available. Some features may not work correctly.');
    }
    
    // Check if cookies are enabled
    if (!navigator.cookieEnabled) {
      issues.push('Cookies are disabled. Authentication and preferences may not work correctly.');
    }
  } catch (error) {
    console.error("Error checking browser compatibility:", error);
  }
  
  return issues;
};
