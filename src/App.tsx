
import React, { lazy, Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/navigation/ScrollToTop';
import { AppRoutes } from './routes';

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {AppRoutes}
      </Routes>
    </>
  );
}

export default App;
