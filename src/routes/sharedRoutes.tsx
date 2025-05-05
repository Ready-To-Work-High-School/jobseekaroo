
import React from 'react';
import { Route, RouteObject } from 'react-router-dom';
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

// Convert JSX routes to RouteObject array for proper spreading in index.tsx
const SharedRoutes: RouteObject[] = [
  {
    path: '/resources',
    element: <ErrorBoundary><Resources /></ErrorBoundary>,
  },
  {
    path: '/interview-prep',
    element: <ErrorBoundary><InterviewPrep /></ErrorBoundary>,
  },
  {
    path: '/interview-questions',
    element: <ErrorBoundary><InterviewQuestions /></ErrorBoundary>,
  },
  {
    path: '/mock-interview',
    element: <ErrorBoundary><MockInterview /></ErrorBoundary>,
  },
  {
    path: '/interview-checklist',
    element: <ErrorBoundary><InterviewChecklist /></ErrorBoundary>,
  },
  {
    path: '/resume-assistant',
    element: <ErrorBoundary><ResumeAssistant /></ErrorBoundary>,
  },
  {
    path: '/pricing',
    element: <ErrorBoundary><Pricing /></ErrorBoundary>,
  },
  {
    path: '/first-job-toolkit',
    element: <ErrorBoundary><FirstJobToolkit /></ErrorBoundary>,
  },
  {
    path: '/skill-development',
    element: <ErrorBoundary><SkillDevelopment /></ErrorBoundary>,
  },
];

export default SharedRoutes;
