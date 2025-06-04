
import React from 'react';
import SchoolDashboard from '@/pages/SchoolDashboard';
import SchoolStudents from '@/pages/school/SchoolStudents';
import SchoolAnalytics from '@/pages/school/SchoolAnalytics';
import SchoolEvents from '@/pages/school/SchoolEvents';
import SchoolResources from '@/pages/school/SchoolResources';

export const SchoolRoutes = [
  {
    path: "/school-dashboard",
    element: <SchoolDashboard />,
    key: "school-dashboard"
  },
  {
    path: "/school/students",
    element: <SchoolStudents />,
    key: "school-students"
  },
  {
    path: "/school/analytics",
    element: <SchoolAnalytics />,
    key: "school-analytics"
  },
  {
    path: "/school/events",
    element: <SchoolEvents />,
    key: "school-events"
  },
  {
    path: "/school/resources",
    element: <SchoolResources />,
    key: "school-resources"
  }
];

export default SchoolRoutes;
