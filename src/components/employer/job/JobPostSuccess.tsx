
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface JobPostSuccessProps {
  jobId: string;
  onContinue: () => void;
}

const JobPostSuccess: React.FC<JobPostSuccessProps> = ({ jobId, onContinue }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-center text-xl">Job Posted Successfully!</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Your job has been posted successfully and is now visible to potential candidates.
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800 text-left">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Students will be able to find your job in search results</li>
            <li>You'll receive notifications when someone applies</li>
            <li>You can manage applications from your dashboard</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          Job ID: {jobId}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-2">
        <Button onClick={onContinue} className="gap-2">
          Continue to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobPostSuccess;
