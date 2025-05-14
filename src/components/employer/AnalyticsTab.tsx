
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Check } from 'lucide-react';

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Analytics</CardTitle>
        <p className="text-muted-foreground mt-1">
          Track performance metrics for your job postings and hiring process
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Hires</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted p-6 rounded-lg text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
          <p className="text-muted-foreground">
            Detailed analytics will be available after you receive applications for your job postings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
