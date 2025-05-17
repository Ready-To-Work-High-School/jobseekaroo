
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Hiring Analytics
        </CardTitle>
        <CardDescription>
          Track performance metrics for your job postings and hiring activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">Analytics Coming Soon</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Our analytics dashboard is currently in development. Soon you'll be able to track 
            views, applications, and other key metrics for your job postings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
