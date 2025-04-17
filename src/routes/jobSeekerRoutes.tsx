
import { Route } from 'react-router-dom';
import JobSearch from '@/pages/JobSearch';
import JobDetail from '@/pages/JobDetail';
import SavedJobs from '@/pages/SavedJobs';
import JobPreferences from '@/pages/JobPreferences';
import ApplicationsTracker from '@/pages/ApplicationsTracker';
import ApplicationDetail from '@/pages/ApplicationDetail';
import ResumeBuilder from '@/pages/ResumeBuilder';
import JobRecommendations from '@/pages/JobRecommendations';
import InterviewPrep from '@/pages/InterviewPrep';
import SkillDevelopment from '@/pages/SkillDevelopment';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import StudentDashboard from '@/pages/StudentDashboard';

export const JobSeekerRoutes = (
  <>
    <Route path="/student-dashboard" element={<StudentDashboard />} />
    <Route path="/jobs" element={<JobSearch />} />
    <Route path="/jobs/:jobId" element={<JobDetail />} />
    <Route path="/saved-jobs" element={<SavedJobs />} />
    <Route path="/job-preferences" element={<JobPreferences />} />
    <Route path="/applications" element={<ApplicationsTracker />} />
    <Route path="/applications/:applicationId" element={<ApplicationDetail />} />
    <Route path="/resume-builder" element={<ResumeBuilder />} />
    <Route path="/job-recommendations" element={<JobRecommendations />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
    <Route path="/skill-development" element={<SkillDevelopment />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/job-simulations/:id" element={<SimulationDetail />} />
  </>
);

export default JobSeekerRoutes;
