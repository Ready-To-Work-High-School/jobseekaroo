
import { useEffect, useRef } from 'react';

/**
 * Hook to optimize main thread work by:
 * - Deferring non-critical operations
 * - Breaking up long tasks
 * - Optimizing rendering cycles
 */
export function useMinimizeMainThreadWork() {
  const timeoutRef = useRef<number[]>([]);
  
  useEffect(() => {
    // Clean up any scheduled work when component unmounts
    return () => {
      timeoutRef.current.forEach(id => window.clearTimeout(id));
    };
  }, []);
  
  /**
   * Schedules work to run after the current task completes
   * @param callback The work to perform
   */
  const scheduleWork = (callback: () => void) => {
    const id = window.setTimeout(() => {
      callback();
      
      // Remove this timeout from our tracking array
      timeoutRef.current = timeoutRef.current.filter(t => t !== id);
    }, 0);
    
    timeoutRef.current.push(id);
    return id;
  };
  
  /**
   * Chunks a large task into smaller pieces to avoid blocking the main thread
   * @param items Array of items to process
   * @param processor Function to process each item
   * @param chunkSize Number of items to process in each chunk
   */
  const processInChunks = <T,>(
    items: T[],
    processor: (item: T) => void,
    chunkSize = 5
  ) => {
    let index = 0;
    
    const processChunk = () => {
      const limit = Math.min(index + chunkSize, items.length);
      
      while (index < limit) {
        processor(items[index]);
        index++;
      }
      
      if (index < items.length) {
        scheduleWork(processChunk);
      }
    };
    
    processChunk();
  };
  
  /**
   * Defers execution of non-critical operations
   * @param callback The function to execute when the browser is idle
   * @param timeout Maximum time to wait before forcing execution
   */
  const deferWork = (callback: () => void, timeout = 2000) => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      // Fallback for browsers without requestIdleCallback
      const id = window.setTimeout(callback, 50);
      timeoutRef.current.push(id);
    }
  };
  
  return { scheduleWork, processInChunks, deferWork };
}

/**
 * Utility to help minimize blocking time by breaking up long-running JS
 */
export const minimizeBlockingTime = {
  /**
   * Yields execution to let the browser handle events
   */
  yieldToMain: () => new Promise(resolve => setTimeout(resolve, 0)),
  
  /**
   * Breaks up a loop to prevent long tasks
   * @param callback Function to call for each iteration
   * @param count Total number of iterations
   * @param chunkSize Number of iterations per chunk
   */
  chunkedLoop: async (
    callback: (i: number) => void | Promise<void>,
    count: number,
    chunkSize = 5
  ) => {
    for (let i = 0; i < count; i += chunkSize) {
      const limit = Math.min(i + chunkSize, count);
      
      for (let j = i; j < limit; j++) {
        await callback(j);
      }
      
      // Yield to main thread
      await minimizeBlockingTime.yieldToMain();
    }
  }
};
