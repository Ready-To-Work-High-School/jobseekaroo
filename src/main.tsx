
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

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

// Wait for the DOM to be fully loaded before rendering
const renderApp = () => {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found');
    return;
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Use either requestIdleCallback or setTimeout to defer non-critical initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
