
import React, { lazy, Suspense } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/navigation/ScrollToTop';
import { AppRoutes } from './routes';
import Layout from './components/Layout';

// Pages that are needed for fallback
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Lazy-loaded pages
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {AppRoutes}
        
        {/* Add fallback route for 404 errors */}
        <Route path="*" element={
          <Layout>
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
              <p className="mb-8">The page you're looking for doesn't exist or has been moved.</p>
              <a href="/" className="text-blue-500 hover:underline">Return to home page</a>
            </div>
          </Layout>
        } />
      </Routes>
    </>
  );
}

export default App;
