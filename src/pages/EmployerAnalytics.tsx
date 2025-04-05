
import React from 'react';
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsHeader from '@/components/employer/analytics/AnalyticsHeader';
import PremiumFeaturesCard from '@/components/employer/analytics/PremiumFeaturesCard';
import { 
  ApplicationsTabContent, 
  DemographicsTabContent, 
  EngagementTabContent 
} from '@/components/employer/analytics/TabContent';

const EmployerAnalytics = () => {
  const { userProfile } = useAuth();
  
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <AnalyticsHeader title="Employer Analytics" />
          
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <ApplicationsTabContent />
            </TabsContent>
            
            <TabsContent value="demographics">
              <DemographicsTabContent />
            </TabsContent>
            
            <TabsContent value="engagement">
              <EngagementTabContent />
            </TabsContent>
          </Tabs>
          
          <PremiumFeaturesCard />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerAnalytics;
