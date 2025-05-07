
import { useState } from 'react';
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

// Mock job data
const jobs = [
  {
    id: '1',
    title: 'Cashier',
    company: 'Local Market',
    location: 'San Francisco, CA',
    posted: '2023-11-03',
    status: 'active',
    applicants: 8
  },
  {
    id: '2',
    title: 'Stock Associate',
    company: 'Retail Store',
    location: 'Oakland, CA',
    posted: '2023-10-27',
    status: 'active',
    applicants: 5
  },
  {
    id: '3',
    title: 'Weekend Server',
    company: 'Cafe Bruno',
    location: 'Berkeley, CA',
    posted: '2023-10-15',
    status: 'closed',
    applicants: 12
  }
];

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const isMobile = useIsMobile();

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
              jobPostings={jobs} 
              isMobile={isMobile}
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
