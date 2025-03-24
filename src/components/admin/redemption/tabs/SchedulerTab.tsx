
import React from 'react';
import EmailScheduler from '../scheduling/EmailScheduler';

interface SchedulerTabProps {
  isScheduling: boolean;
  onSchedule: (params: {
    recipients: string;
    subject: string;
    message: string;
    codeType: 'student' | 'employer';
    amount: number;
    expiresInDays: number;
    scheduleDate: Date;
    scheduleTime: string;
  }) => Promise<void>;
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
