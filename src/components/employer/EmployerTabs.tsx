
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import BenefitsTabContent from './BenefitsTabContent';
import JobPostingCard from './JobPostingCard';
import ContactCard from './ContactCard';
import CompanyProfileTab from './tabs/CompanyProfileTab';
import ApplicantManagementTab from './tabs/ApplicantManagementTab';
import InterviewSchedulingTab from './tabs/InterviewSchedulingTab';
import CandidateMessagingTab from './tabs/CandidateMessagingTab';
import ApprenticeshipProgramsTab from './tabs/ApprenticeshipProgramsTab';
import PerformanceAnalyticsTab from './tabs/PerformanceAnalyticsTab';
import CareerEventsTab from './tabs/CareerEventsTab';

const EmployerTabs = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="benefits" className="max-w-4xl mx-auto mb-16" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 gap-1 mb-8 overflow-x-auto">
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="post-job">Post Job</TabsTrigger>
        <TabsTrigger value="company-profile">Company Profile</TabsTrigger>
        <TabsTrigger value="applicant-management">Applicants</TabsTrigger>
        <TabsTrigger value="messaging">Messaging</TabsTrigger>
        <TabsTrigger value="interviews">Interviews</TabsTrigger>
        <TabsTrigger value="apprenticeships">Apprenticeships</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        {!isMobile && <TabsTrigger value="contact">Contact Us</TabsTrigger>}
      </TabsList>
      
      <TabsContent value="benefits">
        <BenefitsTabContent />
      </TabsContent>
      
      <TabsContent value="post-job">
        <JobPostingCard />
      </TabsContent>
      
      <TabsContent value="company-profile">
        <CompanyProfileTab />
      </TabsContent>
      
      <TabsContent value="applicant-management">
        <ApplicantManagementTab />
      </TabsContent>
      
      <TabsContent value="messaging">
        <CandidateMessagingTab />
      </TabsContent>
      
      <TabsContent value="interviews">
        <InterviewSchedulingTab />
      </TabsContent>
      
      <TabsContent value="apprenticeships">
        <ApprenticeshipProgramsTab />
      </TabsContent>
      
      <TabsContent value="analytics">
        <PerformanceAnalyticsTab />
      </TabsContent>
      
      <TabsContent value="events">
        <CareerEventsTab />
      </TabsContent>
      
      <TabsContent value="contact">
        <ContactCard />
      </TabsContent>
    </Tabs>
  );
};

export default EmployerTabs;
