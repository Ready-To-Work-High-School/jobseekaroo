
import { Route } from 'react-router-dom';
import JobListings from '@/pages/JobListings';
import JobDetails from '@/pages/JobDetails';
import SavedJobs from '@/pages/SavedJobs';
import InterviewPrep from '@/pages/InterviewPrep';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import StudentDashboard from '@/pages/StudentDashboard';
import Profile from '@/pages/Profile';

export const JobSeekerRoutes = (
  <>
    <Route path="/student-dashboard" element={<StudentDashboard />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/jobs/:id" element={<JobDetails />} />
    <Route path="/saved-jobs" element={<SavedJobs />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/job-simulations/:id" element={<SimulationDetail />} />
  </>
);

export default JobSeekerRoutes;
