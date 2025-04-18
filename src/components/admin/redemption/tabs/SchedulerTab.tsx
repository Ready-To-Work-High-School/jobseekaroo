
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface SchedulerTabProps {
  onSchedule: (params: ScheduleEmailParams) => Promise<boolean>;
  isScheduling: boolean;
}

const SchedulerTab: React.FC<SchedulerTabProps> = ({
  onSchedule,
  isScheduling
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Scheduler</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Schedule emails with redemption codes.</p>
          {isScheduling && <p>Scheduling in progress...</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulerTab;
