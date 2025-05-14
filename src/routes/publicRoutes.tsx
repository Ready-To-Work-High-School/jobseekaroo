
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import UnderConstruction from '@/pages/UnderConstruction';
import EntrepreneurshipAcademy from '@/pages/EntrepreneurshipAcademy';
import SampleCandidates from '@/pages/SampleCandidates';
import ResumeAssistant from '@/pages/ResumeAssistant';
import JobPostingPage from '@/pages/employer/JobPostingPage';

// Public routes that don't require authentication
export const PublicRoutes = (
  <>
    <Route path="/entrepreneurship-academy" element={<Layout><EntrepreneurshipAcademy /></Layout>} />
    <Route path="/sample-candidates" element={<Layout><SampleCandidates /></Layout>} />
    <Route path="/resume-assistant" element={<Layout><ResumeAssistant /></Layout>} />
    <Route path="/post-job" element={<Layout><JobPostingPage /></Layout>} />
  </>
);

export default PublicRoutes;
