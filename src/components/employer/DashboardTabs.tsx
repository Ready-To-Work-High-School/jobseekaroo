
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobPostingsTab from './JobPostingsTab';
import ApplicantsTab from './ApplicantsTab';
import CreateJobTab from './CreateJobTab';
import { PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Placeholder job postings data
const jobPostings = [
  {
    id: '1',
    title: 'Retail Associate',
    company: 'Westside Retail',
    location: 'Jacksonville, FL',
    posted: '2023-10-15',
    status: 'active',
    applicants: 12
  },
  {
    id: '2',
    title: 'Administrative Assistant',
    company: 'Westside Retail',
    location: 'Jacksonville, FL',
    posted: '2023-09-28',
    status: 'active',
    applicants: 8
  },
  {
    id: '3',
    title: 'Customer Service Rep',
    company: 'Westside Retail',
    location: 'Jacksonville, FL',
    posted: '2023-08-10',
    status: 'closed',
    applicants: 15
  }
];

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("postings");
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="postings" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="postings">Postings</TabsTrigger>
        <TabsTrigger value="applicants">Applicants</TabsTrigger>
        <TabsTrigger value="create">Create Job</TabsTrigger>
      </TabsList>
      
      <TabsContent value="postings" className="space-y-4 mt-6">
        <JobPostingsTab 
          jobPostings={jobPostings} 
          isMobile={isMobile} 
          setActiveTab={setActiveTab} 
        />
      </TabsContent>
      
      <TabsContent value="applicants" className="space-y-4 mt-6">
        <ApplicantsTab />
      </TabsContent>
      
      <TabsContent value="create" className="mt-6">
        <CreateJobTab setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
