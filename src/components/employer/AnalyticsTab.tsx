
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AnalyticsTab = () => {
  const { userProfile } = useAuth();
  const hasPremium = userProfile?.preferences?.hasPremium === true;

  // If user doesn't have premium, show limited analytics with upgrade prompt
  if (!hasPremium) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Premium Analytics</span>
            </CardTitle>
            <CardDescription>
              Unlock advanced analytics features with our premium plan
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-amber-500" />
              <h3 className="text-lg font-medium mb-2">Enhanced Analytics</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Gain deeper insights into your job postings, applicant quality, and hiring performance with our premium analytics package.
              </p>
              <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                <Link to="/employer-premium">Upgrade to Premium</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
                  <div className="bg-blue-50 rounded-md p-4 text-center dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">35</p>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4 text-center opacity-50 dark:bg-gray-800/30">
                    <p className="text-2xl font-bold text-muted-foreground">?</p>
                    <p className="text-sm text-muted-foreground">Premium Only</p>
                  </div>
                </div>
                <div className="h-48 bg-gray-50 dark:bg-gray-800/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    <Sparkles className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                    Premium Feature
                  </p>
                </div>
              </div>
            </CardContent>
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
              <div className="h-48 bg-gray-50 dark:bg-gray-800/20 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                  <p className="text-muted-foreground">Premium Feature</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/employer-premium">
                  <Sparkles className="h-4 w-4 mr-1 text-amber-500" />
                  Upgrade to Premium
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  // Full analytics for premium users
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
              <div className="bg-blue-50 rounded-md p-4 text-center dark:bg-blue-900/20">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">35</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              <div className="bg-green-50 rounded-md p-4 text-center dark:bg-green-900/20">
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">8</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center dark:bg-gray-800/20">
              <p className="text-muted-foreground text-center">Application Trend Chart</p>
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
              <div className="bg-purple-50 rounded-md p-4 text-center dark:bg-purple-900/20">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">62%</p>
                <p className="text-sm text-muted-foreground">Direct Applications</p>
              </div>
              <div className="bg-amber-50 rounded-md p-4 text-center dark:bg-amber-900/20">
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">38%</p>
                <p className="text-sm text-muted-foreground">Referrals</p>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center dark:bg-gray-800/20">
              <p className="text-muted-foreground text-center">Source Distribution Chart</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/employer/analytics">
              <TrendingUp className="h-4 w-4 mr-1" />
              View Full Analytics
            </Link>
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
            Advanced analytics to track your recruitment performance
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md flex items-center justify-center dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">View detailed metrics, conversion rates, and applicant quality scoring</p>
              <Button asChild>
                <Link to="/employer/analytics">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Go to Analytics Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
