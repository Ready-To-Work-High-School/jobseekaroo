
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      notifyOnChangeProps: 'all', // Fixed: using a valid value for v5
    },
  },
});

function App() {
  console.log('App component rendering');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Outlet />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
