
import { checkMissingLinks, checkCriticalComponents } from '../utils/componentChecker';

/**
 * Run all system diagnostic checks
 * @returns Array of detected issues
 */
export const runSystemDiagnostics = async () => {
  // Check for UI components and navigation issues
  const linkIssues = checkMissingLinks();
  const componentIssues = checkCriticalComponents();
  
  // Check for performance issues
  const performanceIssues = await checkPerformanceIssues();
  
  // Check for browser compatibility issues
  const compatibilityIssues = checkBrowserCompatibility();
  
  // Combine all issues
  return [...linkIssues, ...componentIssues, ...performanceIssues, ...compatibilityIssues];
};

/**
 * Check for potential performance issues
 * @returns Array of performance-related issues
 */
const checkPerformanceIssues = async (): Promise<string[]> => {
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

    // Check for network latency
    const latencyIssues = await checkNetworkLatency();
    issues.push(...latencyIssues);
    
  } catch (error) {
    console.error("Error checking performance:", error);
  }
  
  return issues;
};

/**
 * Check network latency to common endpoints
 * @returns Array of latency-related issues
 */
const checkNetworkLatency = async (): Promise<string[]> => {
  const issues: string[] = [];
  
  // Don't bother checking if we're offline
  if (!navigator.onLine) {
    return ["Network offline"];
  }
  
  // Test endpoints to check - using common CDNs and APIs
  const endpoints = [
    { name: 'Google', url: 'https://www.google.com/generate_204' },
    { name: 'Cloudflare', url: 'https://cloudflare.com/cdn-cgi/trace' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const startTime = performance.now();
      await fetch(endpoint.url, { 
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      
      // If latency is high, report an issue
      if (latency > 500) {
        issues.push(`High latency (${latency}ms) to ${endpoint.name}`);
      } else if (latency > 200) {
        issues.push(`Elevated latency (${latency}ms) to ${endpoint.name}`);
      }
      
      console.log(`Latency to ${endpoint.name}: ${latency}ms`);
    } catch (e) {
      console.error(`Error checking latency to ${endpoint.name}:`, e);
      issues.push(`Failed to check latency to ${endpoint.name}`);
    }
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
