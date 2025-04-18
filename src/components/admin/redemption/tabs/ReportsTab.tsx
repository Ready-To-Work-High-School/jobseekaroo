
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RedemptionCode } from '@/types/redemption';

interface ReportsTabProps {
  codes: RedemptionCode[];
  formatDate: (date?: Date | string) => string;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ codes, formatDate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Redemption Code Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Reports dashboard will be implemented here.</p>
          <p>Total Codes Available: {codes.length}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
