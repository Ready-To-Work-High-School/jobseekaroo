
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, LineChart, Settings, Users, KanbanSquare, PlusCircle } from 'lucide-react';
import PostingsTab from './tabs/JobPostingsTab';
import ApplicantsTab from './ApplicantsTab';
import AnalyticsTab from './AnalyticsTab';
import SettingsTab from './SettingsTab';
import CreateJobTab from './CreateJobTab';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 gap-2">
          <TabsTrigger value="postings">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Job Postings</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="applicants">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Applicants</span>
            <span className="sm:hidden">Apply</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Config</span>
          </TabsTrigger>
          <TabsTrigger value="candidates" className="bg-amber-50 hover:bg-amber-100 text-amber-700">
            <KanbanSquare className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Kanban Board</span>
            <span className="sm:hidden">Kanban</span>
          </TabsTrigger>
        </TabsList>
        
        {activeTab === "postings" && (
          <Button onClick={() => setActiveTab("create")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Button>
        )}
      </div>

      <TabsContent value="postings" className="space-y-4">
        <PostingsTab setActiveTab={setActiveTab} isMobile={false} jobPostings={[
          {
            id: "1",
            title: "Retail Associate",
            company: "Local Market",
            location: "Miami, FL",
            posted: "2025-04-15",
            status: "active",
            applicants: 12
          },
          {
            id: "2",
            title: "Customer Service Representative",
            company: "Tech Solutions Inc",
            location: "Orlando, FL",
            posted: "2025-04-10",
            status: "active",
            applicants: 8
          },
          {
            id: "3",
            title: "Administrative Assistant",
            company: "Business Enterprises",
            location: "Tampa, FL",
            posted: "2025-04-05",
            status: "closed",
            applicants: 15
          }
        ]} />
      </TabsContent>
      
      <TabsContent value="applicants" className="space-y-4">
        <ApplicantsTab />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4">
        <AnalyticsTab />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4">
        <SettingsTab />
      </TabsContent>
      
      <TabsContent value="create" className="space-y-4">
        <CreateJobTab setActiveTab={setActiveTab} />
      </TabsContent>
      
      <TabsContent value="candidates" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Pipeline</CardTitle>
            <CardDescription>
              Manage your candidate pipeline with our interactive Kanban board
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Organize candidates through your hiring process using our drag-and-drop interface. Move candidates between stages, add notes, and track progress all in one place.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 text-center bg-blue-50">
                <h3 className="font-medium mb-1">Applied</h3>
                <p className="text-sm text-muted-foreground">New applicants waiting for review</p>
              </div>
              <div className="border rounded-md p-4 text-center bg-amber-50">
                <h3 className="font-medium mb-1">Interview</h3>
                <p className="text-sm text-muted-foreground">Candidates in interview process</p>
              </div>
              <div className="border rounded-md p-4 text-center bg-green-50">
                <h3 className="font-medium mb-1">Hired</h3>
                <p className="text-sm text-muted-foreground">Successfully placed candidates</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/employer/candidates">Open Kanban Board</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
