
import React from 'react';
import AnalyticsDashboard from '@/components/employer/analytics/AnalyticsDashboard';
import { BarChart3, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ApplicationsTabContent = () => {
  return <AnalyticsDashboard />;
};

export const DemographicsTabContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <CardTitle>Demographics Analytics</CardTitle>
          </div>
          <CardDescription>
            Understand the diversity and background of your applicant pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">Age Distribution</h4>
              <p className="text-sm text-blue-700 mt-1">Analyze applicant age ranges and trends</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">Education Levels</h4>
              <p className="text-sm text-green-700 mt-1">Track educational backgrounds and qualifications</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900">Geographic Data</h4>
              <p className="text-sm text-purple-700 mt-1">View applicant locations and commute preferences</p>
            </div>
          </div>
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming in the next update</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              We're working on comprehensive demographic insights to help you understand your applicant diversity and make data-driven hiring decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const EngagementTabContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <CardTitle>Engagement Analytics</CardTitle>
          </div>
          <CardDescription>
            Track how candidates interact with your job postings and content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">Job View Metrics</h4>
              <p className="text-sm text-green-700 mt-1">Monitor how many candidates view your postings</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">Application Conversion</h4>
              <p className="text-sm text-blue-700 mt-1">Track view-to-application conversion rates</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900">Time Spent</h4>
              <p className="text-sm text-orange-700 mt-1">Analyze how long candidates spend on your listings</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900">Interaction Heatmaps</h4>
              <p className="text-sm text-purple-700 mt-1">See which parts of your job posts get the most attention</p>
            </div>
          </div>
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming in the next update</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Advanced engagement tracking is in development. These features will help you optimize your job postings for maximum candidate engagement and better hiring outcomes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
