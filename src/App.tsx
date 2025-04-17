
import React from 'react';
import { Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/index';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {AppRoutes}
            </Routes>
            <Toaster />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
