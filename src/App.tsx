
import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from 'react-error-boundary';

// Import routes
import AppRoutes from './routes';

// Import ErrorPage for the fallback
import ErrorPage from './pages/ErrorPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <ErrorBoundary fallback={<ErrorPage />}>
            <div className="min-h-screen flex flex-col">
              <Routes>
                {AppRoutes}
              </Routes>
              <Toaster />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
