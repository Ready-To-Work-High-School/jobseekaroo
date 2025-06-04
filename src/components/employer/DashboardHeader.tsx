import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart3, Users, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  setActiveTab?: (tab: string) => void;
}

const DashboardHeader = ({ setActiveTab }: DashboardHeaderProps = {}) => {
  const { userProfile } = useAuth();
  const companyName = userProfile?.company_name || 'Your Company';
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
        {setActiveTab && (
          <Button onClick={() => setActiveTab("create")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Quick Post Job
          </Button>
        )}
      </div>

      <p className="text-muted-foreground">
        Welcome to the employer portal for {companyName}. Manage your job postings and find the perfect candidates.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHeader;
