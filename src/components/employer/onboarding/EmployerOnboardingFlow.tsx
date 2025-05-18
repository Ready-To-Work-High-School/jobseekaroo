
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EmployerOnboardingFlow = () => {
  const [activeTab, setActiveTab] = useState("welcome");
  const navigate = useNavigate();

  // Animation variants for tab content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "company", label: "Company Info" },
    { id: "profile", label: "Profile" },
    { id: "plans", label: "Choose Plan" },
    { id: "complete", label: "Complete" }
  ];

  const goToNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id);
    }
  };

  const finishOnboarding = () => {
    navigate('/employer-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-amber-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <CardTitle>Employer Onboarding</CardTitle>
          </div>
          <CardDescription>
            Complete your profile to start connecting with qualified high school talent
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-8">
              {steps.map((step) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  disabled={step.id === "complete" && activeTab !== "complete"}
                >
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="welcome">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="text-center py-8">
                  <div className="mx-auto bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <Sparkles className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Welcome to JS4HS</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    We're excited to help you connect with talented high school students. 
                    Let's set up your employer profile in just a few steps.
                  </p>
                  <div className="max-w-md mx-auto bg-blue-50 border border-blue-100 rounded-md p-4 mb-8">
                    <h4 className="font-medium mb-2">What you'll need:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Company information</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Job positions you're hiring for</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Logo image (optional)</span>
                      </li>
                    </ul>
                  </div>
                  <Button onClick={goToNextStep} className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="company">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-4">Company Information</h3>
                <p className="text-muted-foreground mb-6">
                  Tell us about your company so students can learn more about you.
                </p>
                
                {/* Company information form would go here */}
                <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-center mb-6">
                  <p className="text-muted-foreground">Company information form fields would be here</p>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPrevStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={goToNextStep} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="profile">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-4">Your Profile</h3>
                <p className="text-muted-foreground mb-6">
                  Tell us about yourself as the company representative.
                </p>
                
                {/* Profile form would go here */}
                <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-center mb-6">
                  <p className="text-muted-foreground">Profile information form fields would be here</p>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPrevStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={goToNextStep} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="plans">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold mb-4">Choose Your Plan</h3>
                <p className="text-muted-foreground mb-6">
                  Select a plan that best fits your hiring needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Basic Plan */}
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg">Basic Plan</CardTitle>
                      <div className="text-2xl font-bold">Free</div>
                      <CardDescription>Get started at no cost</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Post up to 3 job listings</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Basic company profile</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Access to candidate database</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={goToNextStep}>Select</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Premium Plan */}
                  <Card className="border-2 border-amber-300 shadow-md">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <CardTitle className="text-lg">Premium Plan</CardTitle>
                      </div>
                      <div className="text-2xl font-bold">$49<span className="text-lg font-normal">/month</span></div>
                      <CardDescription>Enhanced visibility & features</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Unlimited job listings</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Featured company profile</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Advanced analytics dashboard</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm">Priority placement in search results</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" onClick={goToNextStep}>
                        Select Premium
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPrevStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={goToNextStep} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="complete">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">You're All Set!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your employer account has been created successfully. You can now start posting jobs
                    and connecting with talented students.
                  </p>
                  <Button 
                    onClick={finishOnboarding} 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 gap-2"
                  >
                    Go to Employer Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Need help? <a href="/support" className="text-blue-600 hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default EmployerOnboardingFlow;
