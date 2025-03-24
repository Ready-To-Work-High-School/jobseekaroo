
import React from 'react';
import UsageOverTimeChart from './charts/UsageOverTimeChart';
import GenerationOverTimeChart from './charts/GenerationOverTimeChart';
import UsageDistributionChart from './charts/UsageDistributionChart';
import TypeDistributionChart from './charts/TypeDistributionChart';
import { 
  prepareDefaultUsageData, 
  prepareDefaultGenerationData,
  prepareUsageDistributionData,
  prepareTypeDistributionData
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

  // Create data for charts
  const { totalCodes, usedCodes, studentCodes, employerCodes } = stats;
  
  const distributionData = prepareUsageDistributionData(usedCodes, totalCodes);
  const typeData = prepareTypeDistributionData(studentCodes, employerCodes);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Redemption Code Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Over Time */}
        <UsageOverTimeChart data={defaultUsageData} />

        {/* Generation Over Time */}
        <GenerationOverTimeChart data={defaultGenerationData} />

        {/* Usage Distribution */}
        <UsageDistributionChart data={distributionData} totalCodes={totalCodes} />

        {/* Type Distribution */}
        <TypeDistributionChart data={typeData} totalCodes={totalCodes} />
      </div>
    </div>
  );
};

export default CodeAnalyticsDashboard;
