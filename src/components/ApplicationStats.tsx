
import { StatusCount, ApplicationStatus } from '@/types/application';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';

interface ApplicationStatsProps {
  statusCounts: StatusCount[];
  totalApplications: number;
}

export const ApplicationStats = ({ statusCounts, totalApplications }: ApplicationStatsProps) => {
  const getActiveCount = () => {
    return statusCounts
      .filter(item => ['applied', 'interview', 'offer'].includes(item.status))
      .reduce((acc, item) => acc + item.count, 0);
  };

  const getInterviewRate = () => {
    const appliedCount = statusCounts.find(s => s.status === 'applied')?.count || 0;
    const interviewingCount = statusCounts.find(s => s.status === 'interview')?.count || 0;
    
    if (appliedCount + interviewingCount === 0) return 0;
    return Math.round((interviewingCount / (appliedCount + interviewingCount)) * 100);
  };

  const getSuccessRate = () => {
    const totalDecidedCount = statusCounts
      .filter(item => ['accepted', 'rejected'].includes(item.status))
      .reduce((acc, item) => acc + item.count, 0);
    
    const acceptedCount = statusCounts.find(s => s.status === 'accepted')?.count || 0;
    
    if (totalDecidedCount === 0) return 0;
    return Math.round((acceptedCount / totalDecidedCount) * 100);
  };

  const activeApplications = getActiveCount();
  const interviewRate = getInterviewRate();
  const successRate = getSuccessRate();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Applications in your tracker
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            In progress
          </p>
          <div className="mt-3">
            <Progress value={(activeApplications / totalApplications) * 100} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{interviewRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Applications reaching interviews
          </p>
          <div className="mt-3">
            <Progress value={interviewRate} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Offers accepted vs. rejected
          </p>
          <div className="mt-3">
            <Progress value={successRate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
