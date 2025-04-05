
import React from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsDashboard from '@/components/employer/analytics/AnalyticsDashboard';

const EmployerAnalytics = () => {
  const { userProfile } = useAuth();
  
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Employer Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Track performance metrics and understand your applicant pool
            </p>
          </div>
          
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <AnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="demographics">
              <div className="bg-muted p-8 rounded-md text-center">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Demographic insights for your applicant pool will be available soon.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement">
              <div className="bg-muted p-8 rounded-md text-center">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed engagement analytics will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h3 className="font-medium text-lg mb-2">Premium Analytics Features</h3>
            <p className="text-muted-foreground mb-4">
              Unlock additional insights with our premium analytics package:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Detailed applicant skill mapping</li>
              <li>Student performance predictions</li>
              <li>Competitor job posting analysis</li>
              <li>Custom report generation</li>
              <li>Interactive data visualization tools</li>
            </ul>
            <Button>Upgrade to Premium</Button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerAnalytics;
