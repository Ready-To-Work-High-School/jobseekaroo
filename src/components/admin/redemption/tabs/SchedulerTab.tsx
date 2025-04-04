
import React from 'react';
import EmailScheduler from '../scheduling/EmailScheduler';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface SchedulerTabProps {
  isScheduling: boolean;
  onSchedule: (params: ScheduleEmailParams) => Promise<boolean>;
}

const SchedulerTab: React.FC<SchedulerTabProps> = ({
  isScheduling,
  onSchedule
}) => {
  return (
    <EmailScheduler 
      onSchedule={onSchedule}
      isScheduling={isScheduling}
    />
  );
};

export default SchedulerTab;
