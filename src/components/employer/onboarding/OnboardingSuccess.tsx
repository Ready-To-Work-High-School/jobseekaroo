
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingSuccess: React.FC = () => {
  return (
    <div className="text-center py-6 space-y-5">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Application Submitted</h3>
        <p className="text-muted-foreground">
          Thank you for submitting your verification information. Our team will review your application and 
          get back to you within 48 hours.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800 text-left">
        <p className="font-medium mb-1">What happens next?</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Our team will review your business details</li>
          <li>We'll send you an email confirmation when approved</li>
          <li>Once approved, you'll have full access to post jobs</li>
        </ul>
      </div>
      
      <div className="pt-4 flex flex-col space-y-4">
        <Button asChild>
          <Link to="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="mailto:support@jobseekaroo.com">
            Contact Support
          </a>
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
