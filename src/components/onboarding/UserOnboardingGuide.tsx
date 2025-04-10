
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Search, Briefcase, Heart, UserCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type OnboardingStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
  targetPath?: string;
};

const UserOnboardingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Find Jobs Near You",
      description: "Search by ZIP code to discover job opportunities in your area with competitive pay for high school students.",
      icon: <Search className="h-10 w-10 text-primary" />,
      targetPath: "/jobs"
    },
    {
      title: "Apply With Confidence",
      description: "Apply directly through our platform and track all your applications in one place.",
      icon: <Briefcase className="h-10 w-10 text-amber-500" />,
      targetPath: "/applications"
    },
    {
      title: "Save Jobs For Later",
      description: "Found a great opportunity? Save it to your favorites to apply when you're ready.",
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      targetPath: "/saved-jobs"
    },
    {
      title: "Complete Your Profile",
      description: "Showcase your skills and achievements to stand out to employers.",
      icon: <UserCheck className="h-10 w-10 text-emerald-500" />,
      targetPath: "/profile"
    }
  ];
  
  useEffect(() => {
    // Check if onboarding has been completed
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    if (location.pathname === "/" && !hasCompletedOnboarding) {
      // Wait a moment before showing onboarding
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [location]);
  
  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const handleSkipOnboarding = () => {
    completeOnboarding();
  };
  
  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };
  
  const goToFeature = () => {
    const targetPath = onboardingSteps[currentStep].targetPath;
    if (targetPath) {
      navigate(targetPath);
    }
    completeOnboarding();
  };
  
  if (!showOnboarding) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed ${isMobile ? 'bottom-16 inset-x-4' : 'bottom-8 right-8 max-w-md'} z-50`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 pb-2 flex justify-between items-center border-b">
            <h3 className="font-semibold text-lg">Welcome to JS4HS!</h3>
            <Button variant="ghost" size="sm" onClick={handleSkipOnboarding}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-full">
                {onboardingSteps[currentStep].icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{onboardingSteps[currentStep].title}</h4>
                <p className="text-muted-foreground text-sm">
                  {onboardingSteps[currentStep].description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-1">
                {onboardingSteps.map((_, index) => (
                  <span 
                    key={index} 
                    className={`block w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSkipOnboarding}>
                  Skip
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={handleNextStep}
                >
                  {currentStep < onboardingSteps.length - 1 ? "Next" : "Finish"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 w-full text-primary"
              onClick={goToFeature}
            >
              Go to {onboardingSteps[currentStep].title} <MapPin className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserOnboardingGuide;
