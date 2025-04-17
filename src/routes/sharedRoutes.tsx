
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';
import Pricing from '@/components/Pricing';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import ErrorBoundary from '@/components/ErrorBoundary';

// Add console logging when routes match
const SharedRoutes = (
  <>
    <Route path="/resources" element={
      <ErrorBoundary>
        {console.log("Resources route matched")}
        <Resources />
      </ErrorBoundary>
    } />
    <Route path="/interview-prep" element={
      <ErrorBoundary>
        {console.log("Interview prep route matched")}
        <InterviewPrep />
      </ErrorBoundary>
    } />
    <Route path="/pricing" element={
      <ErrorBoundary>
        {console.log("Pricing route matched")}
        <Pricing />
      </ErrorBoundary>
    } />
    <Route path="/first-job-toolkit" element={
      <ErrorBoundary>
        {console.log("First job toolkit route matched")}
        <FirstJobToolkit />
      </ErrorBoundary>
    } />
  </>
);

console.log("SharedRoutes loaded");
export default SharedRoutes;
