
import { useEffect } from 'react';

/**
 * Reports Web Vitals metrics
 * @param metric The web vital metric to report
 */
const reportWebVitals = (metric: any) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // Could send to analytics service in production
  // Example: sendToAnalytics(metric);
};

/**
 * Track component render time
 * @param componentName The name of the component to track
 */
export const useRenderTracker = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 50) { // Only log slow renders
        console.warn(`Slow render: ${componentName} took ${duration.toFixed(1)}ms to render`);
      }
    };
  }, [componentName]);
};

/**
 * Measure time between navigation and page interactive
 */
export const useMeasurePageLoad = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Mark navigation start
    performance.mark('app_navigation_start');
    
    // When page is interactive
    window.addEventListener('load', () => {
      // Mark end and measure
      performance.mark('app_interactive');
      performance.measure('app_page_load', 'app_navigation_start', 'app_interactive');
      
      // Log results
      const pageLoad = performance.getEntriesByName('app_page_load')[0];
      console.log(`Page load time: ${pageLoad.duration.toFixed(0)}ms`);
      
      // Get largest contentful paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const lcpEntry = entryList.getEntries()[0];
        console.log(`Largest Contentful Paint: ${lcpEntry.startTime.toFixed(0)}ms`);
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Get first input delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          // Cast to the proper PerformanceEventTiming type for FID entries
          const fidEntry = entries[0] as PerformanceEventTiming;
          // Now we can access processingStart
          console.log(`First Input Delay: ${fidEntry.processingStart - fidEntry.startTime}ms`);
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    });
  }, []);
};

export default reportWebVitals;
