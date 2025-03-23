
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import BenefitsTabContent from './BenefitsTabContent';
import JobPostingCard from './JobPostingCard';
import ContactCard from './ContactCard';

const EmployerTabs = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="benefits" className="max-w-4xl mx-auto mb-16" onValueChange={setActiveTab}>
      <TabsList className={`grid grid-cols-${isMobile ? '2' : '3'} mb-8`}>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="post-job">Post a Job</TabsTrigger>
        {!isMobile && <TabsTrigger value="contact">Contact Us</TabsTrigger>}
      </TabsList>
      
      <TabsContent value="benefits">
        <BenefitsTabContent />
      </TabsContent>
      
      <TabsContent value="post-job">
        <JobPostingCard />
      </TabsContent>
      
      <TabsContent value="contact">
        <ContactCard />
      </TabsContent>
    </Tabs>
  );
};

export default EmployerTabs;
