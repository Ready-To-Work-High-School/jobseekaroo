
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import StepProgress from '@/components/students/StepProgress';
import StepOne from '@/components/students/toolkit-steps/StepOne';
import StepTwo from '@/components/students/toolkit-steps/StepTwo';
import StepThree from '@/components/students/toolkit-steps/StepThree';
import StepFour from '@/components/students/toolkit-steps/StepFour';
import StepFive from '@/components/students/toolkit-steps/StepFive';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FirstJobToolkitContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const stepComponents = [
    <StepOne key="step-1" />,
    <StepTwo key="step-2" />,
    <StepThree key="step-3" />,
    <StepFour key="step-4" />,
    <StepFive key="step-5" />
  ];
  
  const stepTitles = [
    "Profile Setup",
    "Resume Builder",
    "Job Search Strategy",
    "Interview Preparation",
    "First Job Success"
  ];
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your First Job in 5 Steps</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Our guided toolkit to help you land and succeed in your first job. Complete each step to build your job readiness!
        </p>
      </div>
      
      <StepProgress currentStep={currentStep} totalSteps={totalSteps} stepTitles={stepTitles} />
      
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Step {currentStep}: {stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Create a complete profile to showcase your skills and experience."}
            {currentStep === 2 && "Build a professional resume that stands out to employers."}
            {currentStep === 3 && "Learn effective job search strategies for entry-level positions."}
            {currentStep === 4 && "Practice and prepare for your upcoming interviews."}
            {currentStep === 5 && "Tips and resources for success in your first job."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stepComponents[currentStep - 1]}
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        
        <Button 
          variant="default" 
          onClick={handleNext} 
          disabled={currentStep === totalSteps}
          className="flex items-center gap-2"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FirstJobToolkitContent;
