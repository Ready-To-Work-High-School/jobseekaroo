
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
  usageOverTime?: {
    date: string;
    count: number;
  }[];
  generationOverTime?: {
    date: string;
    count: number;
  }[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ 
  stats, 
  usageOverTime, 
  generationOverTime 
}) => {
  return (
    <CodeAnalyticsDashboard 
      stats={stats} 
      usageOverTime={usageOverTime}
      generationOverTime={generationOverTime}
    />
  );
};

export default AnalyticsTab;
