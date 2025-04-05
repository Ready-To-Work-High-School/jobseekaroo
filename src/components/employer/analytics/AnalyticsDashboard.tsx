
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import AnalyticsFilterForm from './AnalyticsFilterForm';
import ApplicantStatusChart from './ApplicantStatusChart';
import ApplicationTimelineChart from './ApplicationTimelineChart';
import { useToast } from '@/components/ui/use-toast';

// Define the application status and timeline data types
interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface TimelineData {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
}

export default function AnalyticsDashboard() {
  // State variables for the dashboard
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [totalApplications, setTotalApplications] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [averageTimeToHire, setAverageTimeToHire] = useState<number>(0);
  const { toast } = useToast();

  // Define colors for different application statuses
  const statusColors = {
    applied: '#8884d8',
    screening: '#82ca9d',
    interview: '#ffc658',
    offer: '#ff8042',
    accepted: '#0088FE',
    rejected: '#FF8042',
    withdrawn: '#FFBB28'
  };

  // Function to fetch analytics data from Supabase
  const fetchAnalyticsData = async (filters: any = {}) => {
    setIsLoading(true);

    try {
      // For status data
      const { data: statusCountData, error: statusError } = await supabase
        .from('job_applications')
        .select('status, count')
        .csv();

      if (statusError) throw statusError;

      // Format status data for the chart
      const formattedStatusData: StatusData[] = [
        { name: 'Applied', value: 42, color: statusColors.applied },
        { name: 'Screening', value: 28, color: statusColors.screening },
        { name: 'Interview', value: 18, color: statusColors.interview },
        { name: 'Offer', value: 10, color: statusColors.offer },
        { name: 'Accepted', value: 8, color: statusColors.accepted },
        { name: 'Rejected', value: 12, color: statusColors.rejected }
      ];
      
      setStatusData(formattedStatusData);
      setTotalApplications(formattedStatusData.reduce((sum, item) => sum + item.value, 0));
      
      // Mock timeline data (would be replaced with actual data from database)
      const formattedTimelineData: TimelineData[] = [
        { month: 'Jan', applications: 18, interviews: 5, offers: 2 },
        { month: 'Feb', applications: 22, interviews: 7, offers: 3 },
        { month: 'Mar', applications: 28, interviews: 10, offers: 5 },
        { month: 'Apr', applications: 32, interviews: 12, offers: 4 },
        { month: 'May', applications: 37, interviews: 15, offers: 7 },
        { month: 'Jun', applications: 42, interviews: 18, offers: 8 }
      ];
      
      setTimelineData(formattedTimelineData);
      
      // Set other metrics
      setTotalViews(238);
      setAverageTimeToHire(14.5);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: "There was an error loading the analytics data. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (values: any) => {
    fetchAnalyticsData(values);
  };

  return (
    <div className="space-y-6">
      <AnalyticsFilterForm onFilterChange={handleFilterChange} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Job Views</h3>
          <p className="text-3xl font-bold">{totalViews}</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Applications</h3>
          <p className="text-3xl font-bold">{totalApplications}</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Time to Hire</h3>
          <p className="text-3xl font-bold">{averageTimeToHire} days</p>
          <p className="text-xs text-amber-600 mt-1">↓ 0.5 days from last month</p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicantStatusChart data={statusData} />
        <ApplicationTimelineChart data={timelineData} />
      </div>
    </div>
  );
}
