
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/index';
import NotFound from './pages/NotFound';
import { TooltipProvider } from '@/components/ui/tooltip';
import MobileBottomNavigation from './components/mobile/MobileBottomNavigation';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {AppRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNavigation />
            <Toaster />
          </div>
        </TooltipProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
