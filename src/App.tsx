
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from '@/components/navigation/ScrollToTop';

// Create a client with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Add cacheTime to reduce refetches
      gcTime: 10 * 60 * 1000, // 10 minutes
      // Prevent excessive network requests
      networkMode: 'always',
      // Improve React re-render behavior when queries change
      notifyOnChangeProps: 'all', // Using valid value for v5
    },
  },
});

function App() {
  console.log('App component rendering with QueryClientProvider');
  
  useEffect(() => {
    console.log('App component mounted - outlet should render children');
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <ScrollToTop /> {/* Add ScrollToTop component */}
        <Outlet />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
