
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, User, Briefcase, School, Target, Award, Calendar } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

type Step = {
  title: string;
  description: string;
  component: React.ReactNode;
};

const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'student' | 'employer' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    goal: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: 'student' | 'employer') => {
    setUserType(value);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 1: Who are you?
  const WhoAreYouStep = (
    <div className="space-y-6">
      <RadioGroup 
        defaultValue={userType || undefined}
        onValueChange={(value) => handleUserTypeChange(value as 'student' | 'employer')}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value="student"
            id="student"
            className="peer sr-only"
          />
          <Label
            htmlFor="student"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <School className="mb-3 h-8 w-8 text-blue-500" />
            <span className="text-lg font-medium">Student</span>
            <p className="text-sm text-muted-foreground mt-2">
              Find jobs, earn badges, and build your skills
            </p>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="employer"
            id="employer"
            className="peer sr-only"
          />
          <Label
            htmlFor="employer"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Briefcase className="mb-3 h-8 w-8 text-green-500" />
            <span className="text-lg font-medium">Employer</span>
            <p className="text-sm text-muted-foreground mt-2">
              Post jobs and find talented students
            </p>
          </Label>
        </div>
      </RadioGroup>

      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: userType ? 1 : 0, 
          height: userType ? 'auto' : 0 
        }}
        className="overflow-hidden"
      >
        {userType === 'student' && (
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <h3 className="font-medium flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-500" /> Student Benefits
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>Access to exclusive job opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>Skills badges to showcase on your profile</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>Resume and interview guidance</span>
              </li>
            </ul>
          </div>
        )}
        
        {userType === 'employer' && (
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <h3 className="font-medium flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" /> Employer Benefits
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Access to motivated high school talent</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Easy job posting and applicant management</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Support workforce development in your community</span>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );

  // Step 2: Basic Info
  const BasicsStep = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input 
            id="firstName" 
            name="firstName"
            placeholder="Your first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input 
            id="lastName" 
            name="lastName"
            placeholder="Your last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      
      {userType === 'student' && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium">Student Profile Preview</h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">{formData.firstName || 'Your'} {formData.lastName || 'Name'}</p>
              <p className="text-sm text-muted-foreground">{formData.email || 'your.email@example.com'}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Student</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">New User</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {userType === 'employer' && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium">Employer Profile Preview</h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p className="font-medium">{formData.firstName || 'Your'} {formData.lastName || 'Name'}</p>
              <p className="text-sm text-muted-foreground">{formData.email || 'your.email@example.com'}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Employer</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">New User</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Goals
  const GoalsStep = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal">What's your main goal?</Label>
        <Input 
          id="goal" 
          name="goal"
          placeholder={userType === 'student' ? "Find a job in..." : "Hire students for..."}
          value={formData.goal}
          onChange={handleInputChange}
        />
      </div>
      
      {userType === 'student' && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" /> Recommended Next Steps
            </h3>
            <ul className="mt-2 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Complete Your Profile</p>
                  <p className="text-muted-foreground text-xs">Add your skills, availability, and interests</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Explore Job Listings</p>
                  <p className="text-muted-foreground text-xs">Browse jobs that match your skills and interests</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Earn Your First Badge</p>
                  <p className="text-muted-foreground text-xs">Complete profile to earn your first skill badge</p>
                </div>
              </li>
            </ul>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-2" />
            <p className="font-medium">You're all set!</p>
            <p className="text-sm text-muted-foreground">Ready to start your journey?</p>
          </motion.div>
        </div>
      )}
      
      {userType === 'employer' && (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" /> Recommended Next Steps
            </h3>
            <ul className="mt-2 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Complete Your Company Profile</p>
                  <p className="text-muted-foreground text-xs">Add your company details and logo</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Post Your First Job</p>
                  <p className="text-muted-foreground text-xs">Create a job listing to attract student talent</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Verify Your Company</p>
                  <p className="text-muted-foreground text-xs">Get verified to improve your visibility to students</p>
                </div>
              </li>
            </ul>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Briefcase className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-medium">You're all set!</p>
            <p className="text-sm text-muted-foreground">Ready to find talented students?</p>
          </motion.div>
        </div>
      )}
    </div>
  );

  const steps: Step[] = [
    {
      title: "Who are you?",
      description: "Let us know whether you're a student or employer",
      component: WhoAreYouStep,
    },
    {
      title: "Basic Information",
      description: "Tell us a bit about yourself",
      component: BasicsStep,
    },
    {
      title: "Your Goals",
      description: "What are you hoping to achieve?",
      component: GoalsStep,
    }
  ];

  const currentStepData = steps[currentStep];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <motion.div 
      className="container max-w-md mx-auto py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                {currentStep + 1}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
            </div>
            {userType && (
              <div className={`px-2 py-0.5 text-xs rounded-full ${
                userType === 'student' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                {userType === 'student' ? 'Student' : 'Employer'}
              </div>
            )}
          </div>
          <CardTitle>{currentStepData.title}</CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStepData.component}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={currentStep === 0 && !userType}
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Complete <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OnboardingWizard;
