import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ApplicantStatusChart from './ApplicantStatusChart';
import ApplicationTimelineChart from './ApplicationTimelineChart';
import { getApplicationStatusCounts, getApplicationTimeline } from '@/lib/supabase/analytics';
import { useAuth } from '@/contexts/AuthContext';

const sampleStatusData = [
  { name: 'Applied', value: 45, color: '#8884d8' },
  { name: 'Screening', value: 30, color: '#82ca9d' },
  { name: 'Interview', value: 15, color: '#ffc658' },
  { name: 'Offer', value: 8, color: '#ff8042' },
  { name: 'Rejected', value: 20, color: '#0088FE' }
];

const sampleTimelineData = [
  { month: 'Jan', applications: 10, interviews: 6, offers: 2 },
  { month: 'Feb', applications: 15, interviews: 8, offers: 3 },
  { month: 'Mar', applications: 12, interviews: 7, offers: 4 },
  { month: 'Apr', applications: 18, interviews: 10, offers: 5 },
  { month: 'May', applications: 22, interviews: 12, offers: 6 }
];

const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [statusData, setStatusData] = useState(sampleStatusData);
  const [timelineData, setTimelineData] = useState(sampleTimelineData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const statusCounts = await getApplicationStatusCounts(user.id);
          if (statusCounts && statusCounts.length > 0) {
            const formattedStatusData = statusCounts.map((item, index) => ({
              name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
              value: item.count,
              color: sampleStatusData[index % sampleStatusData.length].color
            }));
            setStatusData(formattedStatusData);
          }

          const timeline = await getApplicationTimeline(user.id);
          if (timeline && timeline.length > 0) {
            setTimelineData(timeline);
          }
        } catch (error) {
          console.error('Error fetching analytics data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Applicant Status</h3>
        <ApplicantStatusChart data={statusData} />
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Application Timeline</h3>
        <ApplicationTimelineChart data={timelineData} />
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
