
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import InterviewPrep from '@/pages/InterviewPrep';
import InterviewQuestions from '@/pages/InterviewQuestions';
import MockInterview from '@/pages/MockInterview';
import InterviewChecklist from '@/pages/InterviewChecklist';
import Pricing from '@/components/Pricing';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkillDevelopment from '@/pages/SkillDevelopment';
import ResumeAssistant from '@/pages/ResumeAssistant';

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
    <Route path="/interview-questions" element={
      <ErrorBoundary>
        <InterviewQuestions />
      </ErrorBoundary>
    } />
    <Route path="/mock-interview" element={
      <ErrorBoundary>
        <MockInterview />
      </ErrorBoundary>
    } />
    <Route path="/interview-checklist" element={
      <ErrorBoundary>
        <InterviewChecklist />
      </ErrorBoundary>
    } />
    <Route path="/resume-assistant" element={
      <ErrorBoundary>
        <ResumeAssistant />
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
    <Route path="/skill-development" element={
      <ErrorBoundary>
        <SkillDevelopment />
      </ErrorBoundary>
    } />
  </>
);

export default SharedRoutes;
