
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CompleteStepProps {
  userEmail?: string;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ userEmail }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">Consent Verified</h2>
      <p className="text-gray-600">
        Thank you! Parental consent has been verified for {userEmail}. You can now use all features of
        the application.
      </p>
      <Button className="w-full" asChild>
        <a href="/dashboard">Continue to Dashboard</a>
      </Button>
    </div>
  );
};

export default CompleteStep;
