
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RedemptionCode } from '@/types/redemption';

interface AnalyticsTabProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
  usageOverTime?: { date: string; count: number; }[];
  generationOverTime?: { date: string; count: number; }[];
  codes: RedemptionCode[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  stats,
  usageOverTime,
  generationOverTime,
  codes
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Redemption Code Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics dashboard will be implemented here.</p>
          <p>Total Codes: {stats.totalCodes}</p>
          <p>Used Codes: {stats.usedCodes}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
