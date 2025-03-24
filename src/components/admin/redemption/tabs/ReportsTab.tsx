
import React from 'react';
import { RedemptionCode } from '@/types/redemption';
import UserRedemptionReport from '../reporting/UserRedemptionReport';

interface ReportsTabProps {
  codes: RedemptionCode[];
  formatDate: (date?: Date | string) => string;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ codes, formatDate }) => {
  return <UserRedemptionReport codes={codes} formatDate={formatDate} />;
};

export default ReportsTab;
