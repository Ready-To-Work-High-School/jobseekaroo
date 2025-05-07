
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stepper, Step } from "@/components/ui/stepper";
import EmployerSignUpForm from "@/components/auth/EmployerSignUpForm";
import { VerificationForm } from "@/components/employer/VerificationForm";
import OnboardingSuccess from "./OnboardingSuccess";

enum OnboardingStep {
  Registration = 0,
  Verification = 1,
  Success = 2
}

const EmployerOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.Registration);
  const [userId, setUserId] = useState<string | null>(null);

  const handleRegistrationSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setCurrentStep(OnboardingStep.Verification);
  };

  const handleVerificationSuccess = () => {
    setCurrentStep(OnboardingStep.Success);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join as an Employer</CardTitle>
        
        <div className="mt-6">
          <Stepper currentStep={currentStep}>
            <Step>Account Registration</Step>
            <Step>Business Verification</Step>
            <Step>Ready to Hire</Step>
          </Stepper>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {currentStep === OnboardingStep.Registration && (
          <EmployerSignUpForm 
            onSuccess={handleRegistrationSuccess}
          />
        )}
        
        {currentStep === OnboardingStep.Verification && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Business Verification Required</p>
              <p>
                To ensure the safety of our teen workers, all employers must complete a verification process. 
                We'll review your information within 48 hours of submission.
              </p>
            </div>
            
            <VerificationForm 
              userId={userId || ''}
              onSuccess={handleVerificationSuccess}
            />
          </div>
        )}
        
        {currentStep === OnboardingStep.Success && (
          <OnboardingSuccess />
        )}
      </CardContent>
    </Card>
  );
};

export default EmployerOnboardingFlow;
