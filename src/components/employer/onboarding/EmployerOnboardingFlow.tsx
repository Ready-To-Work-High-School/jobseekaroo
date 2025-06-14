
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Building2, Users, Target, Zap, Star } from 'lucide-react';
import { Stepper, Step } from '@/components/ui/stepper';
import WelcomeStep from './steps/WelcomeStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import VerificationStep from './steps/VerificationStep';
import JobPostingStep from './steps/JobPostingStep';
import CompletionStep from './steps/CompletionStep';

const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome', icon: Building2 },
  { id: 'company', title: 'Company Info', icon: Users },
  { id: 'verification', title: 'Verification', icon: CheckCircle },
  { id: 'job-posting', title: 'First Job', icon: Target },
  { id: 'completion', title: 'Complete', icon: Zap }
];

const EmployerOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepData, setStepData] = useState({
    welcome: {},
    company: {},
    verification: {},
    jobPosting: {},
    completion: {}
  });

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepComplete = (stepId: string, data: any) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: data
    }));
    handleNext();
  };

  const progressPercentage = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  const renderStepContent = () => {
    switch (ONBOARDING_STEPS[currentStep].id) {
      case 'welcome':
        return <WelcomeStep onComplete={(data) => handleStepComplete('welcome', data)} />;
      case 'company':
        return <CompanyInfoStep onComplete={(data) => handleStepComplete('company', data)} />;
      case 'verification':
        return <VerificationStep onComplete={(data) => handleStepComplete('verification', data)} />;
      case 'job-posting':
        return <JobPostingStep onComplete={(data) => handleStepComplete('jobPosting', data)} />;
      case 'completion':
        return <CompletionStep data={stepData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Premium Service Banner */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
                alt="Job Seekers 4 High Schools Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-semibold text-amber-900">Premium Onboarding Service</span>
              <Star className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <p className="text-center text-amber-800 mt-2 text-sm">
            Comprehensive onboarding solution with pre-boarding, verification, and 5-day acclimation program
          </p>
        </CardContent>
      </Card>

      {/* Progress Header */}
      <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl text-blue-900 flex items-center">
                JS4HS Employer Onboarding
                <Badge variant="secondary" className="ml-3 bg-amber-100 text-amber-800 border-amber-300">
                  Premium
                </Badge>
              </CardTitle>
              <CardDescription className="text-blue-700">
                Set up your comprehensive onboarding system including pre-boarding, verification, and first 5 days acclimation
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-700">
              <span>Premium Onboarding Setup Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Navigation */}
      <Card>
        <CardContent className="p-6">
          <Stepper currentStep={currentStep}>
            {ONBOARDING_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Step key={step.id}>
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="h-4 w-4 mb-1" />
                    <span className="text-xs font-medium">{step.title}</span>
                  </div>
                </Step>
              );
            })}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < ONBOARDING_STEPS.length - 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployerOnboardingFlow;
