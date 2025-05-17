
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Search, Users, Award } from 'lucide-react';

const EmployerKeyFeatures = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Key Employer Features</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
              Easy Job Posting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create and manage job listings with our user-friendly dashboard
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Search className="h-4 w-4 mr-2 text-blue-600" />
              Candidate Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our system helps match your postings with qualified student candidates
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              Applicant Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review applications, schedule interviews, and track candidate progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Award className="h-4 w-4 mr-2 text-blue-600" />
              School Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect directly with high school career programs and advisors
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerKeyFeatures;
