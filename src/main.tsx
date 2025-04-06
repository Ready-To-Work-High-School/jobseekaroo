
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/AuthProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Remove the 'suspense: true' option that's causing the error
      staleTime: 60000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Create the root and render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
