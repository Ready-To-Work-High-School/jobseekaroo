
import React from 'react';
import { Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/index';
import { TooltipProvider } from '@/components/ui/tooltip';
import MobileBottomNavigation from './components/mobile/MobileBottomNavigation';
import AutoRecoveryErrorBoundary from './components/ErrorRecovery/AutoRecoveryErrorBoundary';
import DiagnosticMenuButton from './components/ErrorRecovery/DiagnosticMenuButton';
import { PublicRoutes } from './routes/publicRoutes';
import { SchoolRoutes } from './routes/schoolRoutes';
import { EmployerRoutes } from './routes/employerRoutes';
import ScrollToTop from './components/navigation/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion'; // Add framer-motion

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
            
            <AnimatePresence mode="wait">
              <Routes>
                {AppRoutes}
                {PublicRoutes}
                {SchoolRoutes}
                {EmployerRoutes}
              </Routes>
            </AnimatePresence>
            <MobileBottomNavigation />
            <Toaster />
          </motion.div>
        </TooltipProvider>
      </AutoRecoveryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
