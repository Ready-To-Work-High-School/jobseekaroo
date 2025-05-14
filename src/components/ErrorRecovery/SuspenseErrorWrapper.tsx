
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '../ErrorBoundary';

interface SuspenseErrorWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

/**
 * A component that combines Suspense and ErrorBoundary
 * for easier error handling in React components
 */
export const SuspenseErrorWrapper = ({
  children,
  fallback,
  errorFallback
}: SuspenseErrorWrapperProps) => {
  const defaultFallback = (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseErrorWrapper;
