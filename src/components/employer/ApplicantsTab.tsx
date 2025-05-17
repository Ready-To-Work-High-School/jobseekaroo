
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const ApplicantsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Applicant Tracking
        </CardTitle>
        <CardDescription>
          View and manage candidates who have applied to your job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No applicants yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            When candidates apply to your job postings, they'll appear here for you to review and manage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantsTab;
