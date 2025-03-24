
import React from 'react';
import AnalyticsDashboard from './dashboard/AnalyticsDashboard';
import { 
  prepareDefaultUsageData, 
  prepareDefaultGenerationData
} from './utils/chartData';

interface CodeAnalyticsDashboardProps {
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

const CodeAnalyticsDashboard: React.FC<CodeAnalyticsDashboardProps> = ({ 
  stats,
  usageOverTime = [],
  generationOverTime = []
}) => {
  // Create default data if none provided
  const defaultUsageData = usageOverTime.length === 0 
    ? prepareDefaultUsageData() 
    : usageOverTime;

  const defaultGenerationData = generationOverTime.length === 0 
    ? prepareDefaultGenerationData() 
    : generationOverTime;

  return (
    <AnalyticsDashboard
      stats={stats}
      usageOverTime={defaultUsageData}
      generationOverTime={defaultGenerationData}
    />
  );
};

export default CodeAnalyticsDashboard;
