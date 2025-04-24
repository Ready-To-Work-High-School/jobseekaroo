
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/index';
import NotFound from './pages/NotFound';
import { TooltipProvider } from '@/components/ui/tooltip';
import MobileBottomNavigation from './components/mobile/MobileBottomNavigation';
import AutoRecoveryErrorBoundary from './components/ErrorRecovery/AutoRecoveryErrorBoundary';
import SystemDiagnosticsPage from './pages/SystemDiagnosticsPage';
import DiagnosticMenuButton from './components/ErrorRecovery/DiagnosticMenuButton';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AutoRecoveryErrorBoundary maxAutoRecoveryAttempts={2}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
              <DiagnosticMenuButton />
            </div>
            
            <Routes>
              {AppRoutes}
              <Route path="/system-diagnostics" element={<SystemDiagnosticsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNavigation />
            <Toaster />
          </div>
        </TooltipProvider>
      </AutoRecoveryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
