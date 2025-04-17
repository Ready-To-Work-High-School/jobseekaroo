
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';
import Pricing from '@/components/Pricing';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import ErrorBoundary from '@/components/ErrorBoundary';

const SharedRoutes = (
  <>
    <Route path="/resources" element={
      <ErrorBoundary>
        <Resources />
      </ErrorBoundary>
    } />
    <Route path="/interview-prep" element={
      <ErrorBoundary>
        <InterviewPrep />
      </ErrorBoundary>
    } />
    <Route path="/pricing" element={
      <ErrorBoundary>
        <Pricing />
      </ErrorBoundary>
    } />
    <Route path="/first-job-toolkit" element={
      <ErrorBoundary>
        <FirstJobToolkit />
      </ErrorBoundary>
    } />
  </>
);

export default SharedRoutes;
