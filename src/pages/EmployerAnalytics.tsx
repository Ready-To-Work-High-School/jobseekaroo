
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsHeader from '@/components/employer/analytics/AnalyticsHeader';
import AnalyticsFilterForm from '@/components/employer/analytics/AnalyticsFilterForm';
import { ApplicationsTabContent, DemographicsTabContent, EngagementTabContent } from '@/components/employer/analytics/TabContent';
import PremiumFeaturesCard from '@/components/employer/analytics/PremiumFeaturesCard';
import { useFadeIn } from '@/utils/animations';

const EmployerAnalytics = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [isLoading, setIsLoading] = useState(false);
  const fadeIn = useFadeIn(300);

  const handleFilterChange = (values: any) => {
    console.log('Filter values:', values);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <AnalyticsHeader 
          title="Employer Analytics" 
          description="Gain insights into your job postings and applicant data"
        />

        <AnalyticsFilterForm 
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
        />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-6">
            <ApplicationsTabContent />
          </TabsContent>
          
          <TabsContent value="demographics" className="mt-6">
            <DemographicsTabContent />
          </TabsContent>
          
          <TabsContent value="engagement" className="mt-6">
            <EngagementTabContent />
          </TabsContent>
        </Tabs>
        
        <PremiumFeaturesCard />
      </div>
    </Layout>
  );
};

export default EmployerAnalytics;
