
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import PremiumServices from '@/pages/PremiumServices';
import StudentDashboard from '@/pages/StudentDashboard';
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
    <Route path="/student-dashboard" element={
      <ErrorBoundary>
        <StudentDashboard />
      </ErrorBoundary>
    } />
  </>
);

export default HomeRoutes;
