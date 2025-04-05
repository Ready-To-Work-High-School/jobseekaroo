
import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ConsentStep } from '../hooks/useConsentFlow';

interface IntroductionStepProps {
  onContinue: () => void;
  onLearnMore: () => void;
}

const IntroductionStep: React.FC<IntroductionStepProps> = ({ onContinue, onLearnMore }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">Parental Consent Required</h2>
      <p className="text-gray-600">
        Because you are under 18, we need your parent or guardian's permission before
        you can create an account and use our service. This is required by the Children's Online
        Privacy Protection Act (COPPA).
      </p>
      <div className="bg-amber-50 p-4 border border-amber-200 rounded-md">
        <p className="text-sm text-amber-800">
          <strong>Why we need this:</strong> We need to collect certain information to provide
          you with job opportunities. Your parent/guardian must consent to this data collection.
        </p>
      </div>
      <div className="flex flex-col space-y-2 mt-2">
        <Button 
          className="w-full" 
          onClick={onContinue}
        >
          Continue
        </Button>
        <Button 
          variant="outline" 
          className="w-full text-blue-600" 
          onClick={onLearnMore}
        >
          Learn More About COPPA
        </Button>
      </div>
    </div>
  );
};

export default IntroductionStep;
