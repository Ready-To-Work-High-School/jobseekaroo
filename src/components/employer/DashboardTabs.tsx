
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListFilter, BarChart3, Settings, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PostingsTab from './PostingsTab';
import ApplicantsTab from './ApplicantsTab';
import SettingsTab from './SettingsTab';
import AnalyticsTab from './AnalyticsTab';
import CreateJobTab from './CreateJobTab';
import FreemiumInfoCard from './FreemiumInfoCard';
import PremiumFeaturesBanner from './PremiumFeaturesBanner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  posted: string;
  status: string;
  applicants: number;
}

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching jobs:', error);
          return;
        }

        if (data) {
          const formattedJobs = data.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company_name,
            location: `${job.location_city}, ${job.location_state}`,
            posted: job.posted_date,
            status: 'active', // You may want to add a status field to your jobs table
            applicants: 0 // This would ideally come from a count of applications
          }));
          setJobPostings(formattedJobs);
        }
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'postings') {
      fetchJobs();
    }
  }, [activeTab, user]);

  return (
    <>
      <FreemiumInfoCard />
      <PremiumFeaturesBanner />
      
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-5 mb-6">
            <TabsTrigger value="postings" className="flex gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Postings</span>
            </TabsTrigger>
            <TabsTrigger value="applicants" className="flex gap-2">
              <Users className="h-4 w-4" />
              <span>Applicants</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger value="create" className="hidden md:flex gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Create Job</span>
              </TabsTrigger>
            )}
          </TabsList>
            
          <TabsContent value="postings">
            <PostingsTab 
              jobPostings={jobPostings} 
              loading={loading}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
            
          <TabsContent value="applicants">
            <ApplicantsTab />
          </TabsContent>
            
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
            
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
            
          <TabsContent value="create">
            <CreateJobTab setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
            
        {isMobile && activeTab !== 'create' && (
          <Button 
            onClick={() => setActiveTab('create')}
            className="fixed right-4 bottom-4 z-10 shadow-lg rounded-full h-14 w-14 p-0"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="sr-only">Create Job</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default DashboardTabs;
