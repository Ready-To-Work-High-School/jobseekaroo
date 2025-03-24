
import React from 'react';
import CodeAnalyticsDashboard from '../analytics/CodeAnalyticsDashboard';

interface AnalyticsTabProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ stats }) => {
  return <CodeAnalyticsDashboard stats={stats} />;
};

export default AnalyticsTab;
