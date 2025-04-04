
import React from 'react';
import AnalyticsDashboard from '../analytics/dashboard/AnalyticsDashboard';
import { RedemptionCode } from '@/types/redemption';
import { prepareUsageHistoricalData } from '../analytics/utils/predictionUtils';

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
  codes?: RedemptionCode[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ 
  stats, 
  usageOverTime = [], 
  generationOverTime = [],
  codes = []
}) => {
  // If we don't have usage data but have codes, generate usage data from them
  const usageData = usageOverTime.length > 0 
    ? usageOverTime 
    : prepareUsageHistoricalData(codes);

  return (
    <AnalyticsDashboard 
      stats={stats} 
      usageOverTime={usageData}
      generationOverTime={generationOverTime}
      codes={codes}
    />
  );
};

export default AnalyticsTab;
