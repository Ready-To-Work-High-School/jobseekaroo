
import React from 'react';
import AnalyticsDashboard from '@/components/employer/analytics/AnalyticsDashboard';

export const ApplicationsTabContent = () => {
  return <AnalyticsDashboard />;
};

export const DemographicsTabContent = () => {
  return (
    <div className="bg-muted p-8 rounded-md text-center">
      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
      <p className="text-muted-foreground">
        Demographic insights for your applicant pool will be available soon.
      </p>
    </div>
  );
};

export const EngagementTabContent = () => {
  return (
    <div className="bg-muted p-8 rounded-md text-center">
      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
      <p className="text-muted-foreground">
        Detailed engagement analytics will be available soon.
      </p>
    </div>
  );
};
