
import React from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsLayout from './AnalyticsLayout';
import UsageOverTimeChart from '../charts/UsageOverTimeChart';
import GenerationOverTimeChart from '../charts/GenerationOverTimeChart';
import UsageDistributionChart from '../charts/UsageDistributionChart';
import TypeDistributionChart from '../charts/TypeDistributionChart';
import PredictionChart from '../charts/PredictionChart';
import MLInsights from '../MLInsights';
import { 
  prepareUsageDistributionData,
  prepareTypeDistributionData
} from '../utils/chartData';
import { RedemptionCode } from '@/types/redemption';

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
  codes?: RedemptionCode[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  stats,
  usageOverTime,
  generationOverTime,
  codes = []
}) => {
  const { totalCodes, usedCodes, studentCodes, employerCodes } = stats;
  
  const distributionData = prepareUsageDistributionData(usedCodes, totalCodes);
  const typeData = prepareTypeDistributionData(studentCodes, employerCodes);

  // Check if we have enough data for predictions
  const hasPredictionData = usageOverTime.length >= 3;

  return (
    <div className="space-y-6">
      <AnalyticsHeader title="Redemption Code Analytics" />
      
      {/* ML Insights Section */}
      {codes.length > 0 && (
        <MLInsights codes={codes} />
      )}
      
      <AnalyticsLayout>
        {/* Historical Data Charts */}
        <UsageOverTimeChart data={usageOverTime} />
        <GenerationOverTimeChart data={generationOverTime} />
        
        {/* Prediction Chart (if we have enough data) */}
        {hasPredictionData && (
          <PredictionChart 
            historicalData={usageOverTime}
            title="7-Day Usage Prediction"
            daysToPredict={7}
          />
        )}
        
        {/* Distribution Charts */}
        <UsageDistributionChart data={distributionData} totalCodes={totalCodes} />
        <TypeDistributionChart data={typeData} totalCodes={totalCodes} />
      </AnalyticsLayout>
    </div>
  );
};

export default AnalyticsDashboard;
