
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Briefcase, MessageCircle, Users, Calendar, BarChart } from "lucide-react";
import JobPostingsTab from "./tabs/JobPostingsTab";
import ApplicantManagementTab from "./tabs/ApplicantManagementTab";
import CandidateMessagingTab from "./tabs/CandidateMessagingTab";
import InterviewSchedulingTab from "./tabs/InterviewSchedulingTab";
import PerformanceAnalyticsTab from "./tabs/PerformanceAnalyticsTab";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employer Dashboard</h2>
        <Button
          onClick={() => navigate('/employer/candidates')}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Candidate Pipeline
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="postings" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Job Postings</span>
          </TabsTrigger>
          <TabsTrigger value="applicants" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Applicants</span>
          </TabsTrigger>
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Messaging</span>
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Interviews</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="postings">
          <JobPostingsTab />
        </TabsContent>
        
        <TabsContent value="applicants">
          <ApplicantManagementTab />
        </TabsContent>
        
        <TabsContent value="messaging">
          <CandidateMessagingTab />
        </TabsContent>
        
        <TabsContent value="interviews">
          <InterviewSchedulingTab />
        </TabsContent>
        
        <TabsContent value="analytics">
          <PerformanceAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
