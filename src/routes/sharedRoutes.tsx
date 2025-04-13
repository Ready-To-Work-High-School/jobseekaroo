
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';

const SharedRoutes = (
  <>
    <Route path="/resources" element={<Resources />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
  </>
);

export default SharedRoutes;
