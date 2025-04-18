
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import PremiumServices from '@/pages/PremiumServices';
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

const HomeRoutes = (
  <>
    <Route path="/" element={
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    } />
    <Route path="/premium-services" element={
      <ErrorBoundary>
        <PremiumServices />
      </ErrorBoundary>
    } />
  </>
);

export default HomeRoutes;
