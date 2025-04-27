
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, TrendingUp, ExternalLink } from 'lucide-react';

const AnalyticsTab = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span>Application Statistics</span>
          </CardTitle>
          <CardDescription>
            Overview of your job posting performance
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-md p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">35</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              <div className="bg-green-50 rounded-md p-4 text-center">
                <p className="text-2xl font-bold text-green-700">8</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-center">Application Trend Chart<br />(Premium Feature)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full">
            View Detailed Report
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            <span>Applicant Sources</span>
          </CardTitle>
          <CardDescription>
            Where your applicants are coming from
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-md p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">62%</p>
                <p className="text-sm text-muted-foreground">Direct Applications</p>
              </div>
              <div className="bg-amber-50 rounded-md p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">38%</p>
                <p className="text-sm text-muted-foreground">Referrals</p>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-center">Source Distribution Chart<br />(Premium Feature)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full" asChild>
            <a href="/employer/analytics">
              <TrendingUp className="h-4 w-4 mr-1" />
              View Full Analytics
            </a>
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            <span>Performance Metrics</span>
          </CardTitle>
          <CardDescription>
            Advanced analytics are available with premium subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="h-32 bg-gradient-to-r from-purple-50 to-blue-50 rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Unlock advanced metrics, conversion rates, and applicant quality scoring</p>
              <Button>
                <ExternalLink className="h-4 w-4 mr-1" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
