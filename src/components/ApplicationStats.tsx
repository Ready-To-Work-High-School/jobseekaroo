
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ApplicationStatus } from '@/types/job.d';
import ApplicationStatusBadge from './ApplicationStatusBadge';

interface StatusCount {
  status: ApplicationStatus;
  count: number;
}

interface ApplicationStatsProps {
  statusCounts: StatusCount[];
  totalApplications: number;
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({ 
  statusCounts, 
  totalApplications 
}) => {
  const getProgressValue = (count: number) => {
    if (totalApplications === 0) return 0;
    return (count / totalApplications) * 100;
  };

  const interviewingCount = statusCounts.find(s => s.status === 'interviewing')?.count || 0;
  const offeredCount = statusCounts.find(s => s.status === 'offered')?.count || 0;
  const acceptedCount = statusCounts.find(s => s.status === 'accepted')?.count || 0;
  
  const successRate = totalApplications > 0 
    ? ((interviewingCount + offeredCount + acceptedCount) / totalApplications) * 100 
    : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Application Statistics</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-blue-700">{totalApplications}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-green-700">{successRate.toFixed(0)}%</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {statusCounts.map(({ status, count }) => (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between">
                  <ApplicationStatusBadge status={status} />
                  <span className="text-sm font-medium">{count}</span>
                </div>
                <Progress value={getProgressValue(count)} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
