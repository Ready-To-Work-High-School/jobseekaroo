
import React from 'react';
import StatsGrid from './redemption/statistics/StatsGrid';
import RedemptionCodeCharts from './redemption/statistics/RedemptionCodeCharts';

interface RedemptionCodeStatsProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
}

const RedemptionCodeStats: React.FC<RedemptionCodeStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <RedemptionCodeCharts stats={stats} />
    </div>
  );
};

export default RedemptionCodeStats;
