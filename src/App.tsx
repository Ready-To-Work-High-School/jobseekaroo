
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import MobileBottomNavigation from './components/mobile/MobileBottomNavigation';
import AutoRecoveryErrorBoundary from './components/ErrorRecovery/AutoRecoveryErrorBoundary';
import DiagnosticMenuButton from './components/ErrorRecovery/DiagnosticMenuButton';
import ScrollToTop from './components/navigation/ScrollToTop';
import { motion } from 'framer-motion';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AutoRecoveryErrorBoundary maxAutoRecoveryAttempts={2}>
        <TooltipProvider>
          <motion.div 
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollToTop />
            <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
              <DiagnosticMenuButton />
            </div>
            
            {/* Render current route */}
            <Outlet />
            
            <MobileBottomNavigation />
            <Toaster />
          </motion.div>
        </TooltipProvider>
      </AutoRecoveryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
