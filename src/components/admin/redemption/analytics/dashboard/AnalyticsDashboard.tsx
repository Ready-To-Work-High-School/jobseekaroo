
import React from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLayout from './AnalyticsLayout';
import UsageOverTimeChart from '../charts/UsageOverTimeChart';
import GenerationOverTimeChart from '../charts/GenerationOverTimeChart';
import UsageDistributionChart from '../charts/UsageDistributionChart';
import TypeDistributionChart from '../charts/TypeDistributionChart';
import { 
  prepareUsageDistributionData,
  prepareTypeDistributionData
} from '../utils/chartData';

interface AnalyticsDashboardProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
  usageOverTime: {
    date: string;
    count: number;
  }[];
  generationOverTime: {
    date: string;
    count: number;
  }[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  stats,
  usageOverTime,
  generationOverTime
}) => {
  const { totalCodes, usedCodes, studentCodes, employerCodes } = stats;
  
  const distributionData = prepareUsageDistributionData(usedCodes, totalCodes);
  const typeData = prepareTypeDistributionData(studentCodes, employerCodes);

  return (
    <div className="space-y-6">
      <AnalyticsHeader title="Redemption Code Analytics" />
      
      <AnalyticsLayout>
        <UsageOverTimeChart data={usageOverTime} />
        <GenerationOverTimeChart data={generationOverTime} />
        <UsageDistributionChart data={distributionData} totalCodes={totalCodes} />
        <TypeDistributionChart data={typeData} totalCodes={totalCodes} />
      </AnalyticsLayout>
    </div>
  );
};

export default AnalyticsDashboard;
