
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const ApplicantsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applicants</CardTitle>
        <p className="text-muted-foreground mt-1">
          Manage and track all applications to your job postings
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium">No applicants yet</h3>
          <p className="text-muted-foreground max-w-md mt-2">
            When candidates apply to your job postings, they will appear here for review.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantsTab;
