
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsHeader from '@/components/employer/analytics/AnalyticsHeader';
import AnalyticsFilterForm from '@/components/employer/analytics/AnalyticsFilterForm';
import { ApplicationsTabContent, DemographicsTabContent, EngagementTabContent } from '@/components/employer/analytics/TabContent';
import PremiumFeaturesCard from '@/components/employer/analytics/PremiumFeaturesCard';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, Sparkles } from 'lucide-react';

const EmployerAnalytics = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [isLoading, setIsLoading] = useState(false);
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // Check if user has premium membership
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  const handleFilterChange = (values: any) => {
    console.log('Filter values:', values);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  // If not premium, show upgrade prompt
  if (!hasPremium) {
    return (
      <Layout>
        <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
          <h1 className="text-3xl font-bold mb-6">Employer Analytics</h1>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Premium Feature</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-lg font-medium mb-2">Analytics is a Premium Feature</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Gain valuable insights into your job postings and applicant data by upgrading to our premium plan.
                </p>
                <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Link to="/employer-premium">Upgrade to Premium</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

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
