
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';
import Pricing from '@/components/Pricing';

const SharedRoutes = (
  <>
    <Route path="/resources" element={<Resources />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
    <Route path="/pricing" element={<Pricing />} />
  </>
);

export default SharedRoutes;
