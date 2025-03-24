
import React from 'react';
import AnalyticsDashboard from '../analytics/dashboard/AnalyticsDashboard';

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
  usageOverTime = [], 
  generationOverTime = [] 
}) => {
  return (
    <AnalyticsDashboard 
      stats={stats} 
      usageOverTime={usageOverTime}
      generationOverTime={generationOverTime}
    />
  );
};

export default AnalyticsTab;
