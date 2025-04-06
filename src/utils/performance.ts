
/**
 * Performance optimization utilities
 */

/**
 * Queue a task to run during browser idle time
 * Falls back to setTimeout for browsers that don't support requestIdleCallback
 * 
 * @param callback Function to execute during idle time
 * @param options Optional configuration
 */
export const scheduleIdleTask = (
  callback: () => void,
  options: { timeout?: number } = {}
): void => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, options.timeout || 1);
  }
};

/**
 * Use this to initialize heavy components or fetch non-critical data
 * only after the page has finished its initial render
 * 
 * @param callback Function to execute after initial render
 */
export const afterInitialRender = (callback: () => void): void => {
  if (typeof window === 'undefined') return;
  
  // Use requestAnimationFrame to wait for the next paint
  requestAnimationFrame(() => {
    // Then use setTimeout to wait a bit longer to ensure the page is interactive
    setTimeout(() => {
      scheduleIdleTask(callback);
    }, 20);
  });
};

/**
 * Split long tasks into smaller chunks to prevent blocking the main thread
 * 
 * @param items Array of items to process
 * @param processor Function to process each item
 * @param chunkSize Number of items to process in each chunk (default: 5)
 */
export const processBatchedTasks = <T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize = 5
): void => {
  let index = 0;
  
  const processChunk = () => {
    const limit = Math.min(index + chunkSize, items.length);
    
    // Process current chunk
    while (index < limit) {
      processor(items[index]);
      index++;
    }
    
    // Schedule next chunk if there are more items
    if (index < items.length) {
      scheduleIdleTask(processChunk);
    }
  };
  
  // Start processing
  scheduleIdleTask(processChunk);
};

/**
 * Detect if the browser is in a low-performance environment
 * and should use reduced animations/effects
 */
export const useLowPerformanceMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for devices that might struggle with heavy animations
  const isLowPowerDevice = 
    // Check for mobile devices
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    // Check if device has battery API and is low on battery
    ('getBattery' in navigator && 
      // @ts-ignore - getBattery exists but TypeScript doesn't recognize it
      navigator.getBattery().then(battery => battery.level < 0.2));
  
  return isLowPowerDevice;
};
