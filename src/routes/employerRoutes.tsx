
import React from 'react';
import { Route } from 'react-router-dom';
import EmployerQRGenerator from '@/pages/EmployerQRGenerator';
import EmployerDashboard from '@/pages/EmployerDashboard';
import EmployerAnalytics from '@/pages/EmployerAnalytics';
import EmployerPremiumServices from '@/pages/EmployerPremiumServices';

export const EmployerRoutes = [
  {
    path: "/employer-dashboard",
    element: <EmployerDashboard />,
    key: "employer-dashboard"
  },
  {
    path: "/employer/qr-generator",
    element: <EmployerQRGenerator />,
    key: "employer-qr-generator"
  },
  {
    path: "/employer-analytics",
    element: <EmployerAnalytics />,
    key: "employer-analytics"
  },
  {
    path: "/employer-premium",
    element: <EmployerPremiumServices />,
    key: "employer-premium"
  }
];

export default EmployerRoutes;
