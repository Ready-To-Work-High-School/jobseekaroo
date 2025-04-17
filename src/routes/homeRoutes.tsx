
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

const HomeRoutes = (
  <>
    <Route path="/" element={
      <ErrorBoundary>
        {console.log("Home route matched")}
        <Home />
      </ErrorBoundary>
    } />
  </>
);

console.log("HomeRoutes loaded");
export default HomeRoutes;
