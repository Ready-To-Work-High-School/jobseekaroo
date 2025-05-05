
import React, { useEffect, useState } from 'react';

interface DeferredContentProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * Component that defers rendering its children until after main content is loaded
 * Good for non-critical UI elements that can be delayed to improve initial load
 */
const DeferredContent: React.FC<DeferredContentProps> = ({ 
  children, 
  delay = 200, 
  fallback = null,
  priority = 'medium'
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    
    // Use requestIdleCallback for low priority content if available
    if (priority === 'low' && window.requestIdleCallback) {
      window.requestIdleCallback(
        () => setShouldRender(true),
        { timeout: delay + 1000 } // Ensure it eventually renders
      );
    } else {
      // Different delays based on priority
      const actualDelay = priority === 'high' ? delay / 2 : delay;
      timeoutId = window.setTimeout(() => setShouldRender(true), actualDelay);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delay, priority]);

  return shouldRender ? <>{children}</> : <>{fallback}</>;
};

export default DeferredContent;
