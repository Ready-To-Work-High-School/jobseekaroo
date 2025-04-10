
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Users, BarChart3, Star } from 'lucide-react';

const EmployerKeyFeatures = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center mb-8">Key Employer Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Premium Job Postings</h3>
              <p className="text-sm text-center text-muted-foreground">Branded listings with priority placement in search results</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Candidate Matching</h3>
              <p className="text-sm text-center text-muted-foreground">AI-powered matching with skill compatibility scores</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-center text-muted-foreground">Comprehensive dashboards with candidate metrics and trends</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-all hover:-translate-y-1 duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Premium Services</h3>
              <p className="text-sm text-center text-muted-foreground">Custom training programs and exclusive partner benefits</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerKeyFeatures;
