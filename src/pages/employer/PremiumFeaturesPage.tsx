
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from 'lucide-react';
import { PremiumFeaturesGrid } from '@/components/employer/premium/PremiumFeaturesGrid';
import ApprenticeshipProgramsTab from '@/components/employer/tabs/ApprenticeshipProgramsTab';
import PerformanceAnalyticsTab from '@/components/employer/tabs/PerformanceAnalyticsTab';
import InterviewSchedulingTab from '@/components/employer/tabs/InterviewSchedulingTab';
import CareerEventsTab from '@/components/employer/tabs/CareerEventsTab';
import CandidateMessagingTab from '@/components/employer/tabs/CandidateMessagingTab';
import AirtableEmbed from '@/components/employer/premium/AirtableEmbed';

const PremiumFeaturesPage = () => {
  const [activeTab, setActiveTab] = React.useState("features");

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="bg-amber-50 border-b border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <CardTitle>Premium Employer Tools</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <PremiumFeaturesGrid />
          </CardContent>
        </Card>

        {/* Airtable Embed */}
        <AirtableEmbed />

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="features">Featured Tools</TabsTrigger>
            <TabsTrigger value="apprenticeships">Apprenticeships</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messaging">Advanced Messaging</TabsTrigger>
            <TabsTrigger value="interviews">Interview Scheduling</TabsTrigger>
            <TabsTrigger value="events">Career Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground mb-4">
                  Select a premium feature tab above to access enhanced employer tools
                </p>
                <PremiumFeaturesGrid />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="apprenticeships" className="mt-6">
            <ApprenticeshipProgramsTab />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <PerformanceAnalyticsTab />
          </TabsContent>
          
          <TabsContent value="messaging" className="mt-6">
            <CandidateMessagingTab />
          </TabsContent>
          
          <TabsContent value="interviews" className="mt-6">
            <InterviewSchedulingTab />
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <CareerEventsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PremiumFeaturesPage;
