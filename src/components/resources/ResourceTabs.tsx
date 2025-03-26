
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import ResourceTab from './ResourceTab';
import { useFadeIn } from '@/utils/animations';
import { 
  resumeResources, 
  interviewResources, 
  workplaceResources, 
  credentialResources,
  type Resource
} from '@/lib/mock-data/resourcesData';

const ResourceTabs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam === 'credentials' ? "credentials" : "resume");
  const contentAnimation = useFadeIn(300);
  
  useEffect(() => {
    if (tabParam === 'credentials') {
      setActiveTab("credentials");
    }
  }, [tabParam]);
  
  const getActiveResources = (): Resource[] => {
    switch(activeTab) {
      case "resume": return resumeResources;
      case "interview": return interviewResources;
      case "workplace": return workplaceResources;
      case "credentials": return credentialResources;
      default: return resumeResources;
    }
  };

  return (
    <Tabs defaultValue={activeTab} value={activeTab} className="max-w-5xl mx-auto mb-16" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
        <TabsTrigger value="resume">Resume Writing</TabsTrigger>
        <TabsTrigger value="interview">Interview Prep</TabsTrigger>
        <TabsTrigger value="workplace">Workplace Readiness</TabsTrigger>
        <TabsTrigger value="credentials">Credentials</TabsTrigger>
      </TabsList>
      
      <div className={`mt-8 ${contentAnimation}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === "resume" ? "Resume Resources" : 
              activeTab === "interview" ? "Interview Resources" : 
              activeTab === "workplace" ? "Workplace Readiness" : 
              "Credential Resources"}
          </h2>
          
          {activeTab === "resume" && (
            <Button asChild>
              <a href="/resume-assistant">Go to Resume Assistant</a>
            </Button>
          )}
        </div>
        
        <ResourceTab resources={getActiveResources()} />
      </div>
    </Tabs>
  );
};

export default ResourceTabs;
