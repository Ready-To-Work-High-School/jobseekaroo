
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook to optimize rendering of expensive components or large lists
 * @param threshold The time in ms to wait before rendering
 * @returns An object with isReady flag and itemsToRender function
 */
export function useOptimizedRender<T>(threshold = 20) {
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Set up delayed rendering
  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setIsReady(true);
    }, threshold);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [threshold]);

  // Function to optimize list rendering by chunking
  const renderListInChunks = useCallback((
    items: T[],
    renderItem: (item: T, index: number) => React.ReactNode,
    chunkSize = 10
  ) => {
    const [visibleItems, setVisibleItems] = useState<T[]>([]);
    
    useEffect(() => {
      // Initial render of first chunk
      setVisibleItems(items.slice(0, chunkSize));
      
      // Gradually add more items
      if (items.length > chunkSize) {
        const renderNextChunk = (startIndex: number) => {
          if (startIndex >= items.length) return;
          
          // Use requestIdleCallback if available, otherwise setTimeout
          if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
              setVisibleItems(prev => [
                ...prev,
                ...items.slice(startIndex, startIndex + chunkSize)
              ]);
              
              renderNextChunk(startIndex + chunkSize);
            }, { timeout: 50 });
          } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
              setVisibleItems(prev => [
                ...prev,
                ...items.slice(startIndex, startIndex + chunkSize)
              ]);
              
              renderNextChunk(startIndex + chunkSize);
            }, 50);
          }
        };
        
        // Start rendering the rest after first chunk
        renderNextChunk(chunkSize);
      }
    }, [items, chunkSize]);
    
    return visibleItems.map(renderItem);
  }, []);

  return { isReady, renderListInChunks };
}

// Add type declaration for requestIdleCallback
declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback: (handle: number) => void;
  }
}
