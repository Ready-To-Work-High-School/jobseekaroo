
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';

import './styles/index.css';

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retry attempts
      networkMode: 'online', // Only make requests when online
    },
  },
});

// Simple loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Lazy load the App component
const App = lazy(() => import('./App'));

// Wait for the DOM to be fully loaded before rendering
const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingFallback />}>
                <App />
              </Suspense>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Use either requestIdleCallback or setTimeout to defer non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    renderApp();
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(renderApp, 0);
}

// Preload additional routes after initial render
const preloadRoutes = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Preload important routes that might be visited next
      import('./pages/JobListings');
      import('./pages/Resources');
    }, { timeout: 3000 }); // Set a timeout to ensure it runs within 3 seconds
  }
};

// Run preload after the app has mounted
if (document.readyState === 'complete') {
  setTimeout(preloadRoutes, 2000);
} else {
  window.addEventListener('load', () => {
    setTimeout(preloadRoutes, 2000);
  });
}
