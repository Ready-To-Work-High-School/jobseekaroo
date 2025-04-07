
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

// Lazy load the App component
const App = lazy(() => import('./App'));

// Simple loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

// Create the root and render the app
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

// Preload additional routes after initial render
const preloadRoutes = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Preload important routes that might be visited next
      import('./pages/JobListings');
      import('./pages/Resources');
    });
  }
};

// Run preload after the app has mounted
setTimeout(preloadRoutes, 2000);
