
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import StepProgress from '@/components/students/StepProgress';
import StepOne from '@/components/students/toolkit-steps/StepOne';
import StepTwo from '@/components/students/toolkit-steps/StepTwo';
import StepThree from '@/components/students/toolkit-steps/StepThree';
import StepFour from '@/components/students/toolkit-steps/StepFour';
import StepFive from '@/components/students/toolkit-steps/StepFive';
import BadgesStep from '@/components/students/toolkit-steps/BadgesStep';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ConfettiAnimation from '@/components/auth/redemption/ConfettiAnimation';
import { useToast } from '@/hooks/use-toast';

const FirstJobToolkitContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const totalSteps = 6; // Added one more step for badges
  const { toast } = useToast();
  
  const stepComponents = [
    <StepOne key="step-1" />,
    <StepTwo key="step-2" />,
    <StepThree key="step-3" />,
    <StepFour key="step-4" />,
    <StepFive key="step-5" />,
    <BadgesStep key="step-6" /> // New badges step
  ];
  
  const stepTitles = [
    "Profile Setup",
    "Resume Builder",
    "Job Search Strategy",
    "Interview Preparation",
    "First Job Success",
    "Career Badges" // New step title
  ];
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      
      // If advancing to the final step, show confetti and toast
      if (currentStep === totalSteps - 1) {
        setShowConfetti(true);
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed the First Job Toolkit!",
        });
        
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    }
  };
  
  // Clean up any timers when component unmounts
  useEffect(() => {
    // No need to return a cleanup function if we don't set any timeouts in the effect
    // If we need one in the future, we'll need to store the timer ID
    return () => {
      // Removed the empty clearTimeout() call that was causing the error
    };
  }, []);
  
  return (
    <div className="space-y-6 relative">
      {showConfetti && <ConfettiAnimation />}
      
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gold-400 via-lavender-500 to-gold-500 bg-clip-text text-transparent">Your First Job in {totalSteps} Steps</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Our guided toolkit to help you land and succeed in your first job. Complete each step to build your job readiness!
        </p>
      </div>
      
      <Card className="shadow-md border-t-4 border-t-gold-400">
        <CardHeader className="bg-gradient-to-r from-lavender-500/5 to-gold-400/5">
          <CardTitle className="text-gold-lavender-gradient">Step {currentStep}: {stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Create a complete profile to showcase your skills and experience."}
            {currentStep === 2 && "Build a professional resume that stands out to employers."}
            {currentStep === 3 && "Learn effective job search strategies for entry-level positions."}
            {currentStep === 4 && "Practice and prepare for your upcoming interviews."}
            {currentStep === 5 && "Tips and resources for success in your first job."}
            {currentStep === 6 && "Earn badges through quizzes and employer endorsements to showcase your skills and character."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stepComponents[currentStep - 1]}
        </CardContent>
      </Card>
      
      <div className="flex flex-col space-y-4">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} stepTitles={stepTitles} />
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentStep === 1}
            className="flex items-center gap-2 border-gold-400/30 hover:bg-gold-400/10"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <Button 
            variant="default" 
            onClick={handleNext} 
            disabled={currentStep === totalSteps}
            className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-lavender-500 hover:from-gold-600 hover:to-lavender-600"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstJobToolkitContent;
