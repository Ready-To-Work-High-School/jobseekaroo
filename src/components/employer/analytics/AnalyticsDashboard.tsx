
import React from 'react';
import { Card } from '@/components/ui/card';
import ApplicantStatusChart from './ApplicantStatusChart';
import ApplicationTimelineChart from './ApplicationTimelineChart';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Applicant Status</h3>
        <ApplicantStatusChart />
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Application Timeline</h3>
        <ApplicationTimelineChart />
      </Card>
      
      <Card className="p-4 md:col-span-2">
        <h3 className="text-lg font-medium mb-4">Recent Applicants</h3>
        <div className="text-center p-8 bg-muted">
          <p className="text-muted-foreground">No recent applicants to display</p>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
