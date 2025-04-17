
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';
import Pricing from '@/components/Pricing';
import FirstJobToolkit from '@/pages/FirstJobToolkit';

console.log('Shared routes loaded');

const SharedRoutes = (
  <>
    {/* Log when this specific route is matched */}
    <Route 
      path="/interview-prep" 
      element={
        <>{console.log('Interview prep route matched')} <InterviewPrep /></>
      } 
    />
    <Route path="/resources" element={<Resources />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
  </>
);

export default SharedRoutes;
