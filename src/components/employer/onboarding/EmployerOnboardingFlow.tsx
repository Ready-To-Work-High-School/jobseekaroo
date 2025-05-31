import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clipboard, Pen, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const EmployerOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    logo: null as File | null
  });

  const steps = [
    { title: 'Welcome', subtitle: 'Get started with JS4HS' },
    { title: 'Company Info', subtitle: 'Tell us about your business' },
    { title: 'Profile', subtitle: 'Complete your profile' },
    { title: 'Choose Plan', subtitle: 'Select your subscription' },
    { title: 'Complete', subtitle: 'You\'re all set!' }
  ];

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            {/* Professional Business Icons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.5 }} 
              className="flex justify-center items-center gap-4 mb-8"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
                <Clipboard className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-amber-500 rounded-full shadow-lg">
                <Pen className="h-6 w-6 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900">Welcome to JS4HS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're excited to help you connect with talented high school students. 
              Let's set up your employer profile in just a few steps.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3">What you'll need:</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Company information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Job positions you're hiring for</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Logo image (optional)</span>
                </div>
              </div>
            </div>
            
            <Button onClick={nextStep} className="mt-6">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              <p className="text-gray-600">Tell us about your business</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Briefly describe your company and what you do..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              <p className="text-gray-600">Who should students contact?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Enter contact person's name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter contact email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter contact phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="logo">Company Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleInputChange('logo', e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-600">Select a subscription plan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-bold">Basic</CardTitle>
                  <CardDescription>Free</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">
                    Perfect for getting started.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Limited job postings</li>
                    <li>Basic support</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-blue-500">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-bold">Pro</CardTitle>
                  <CardDescription>$99/month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">
                    Unlock more features and reach.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Unlimited job postings</li>
                    <li>Priority support</li>
                    <li>Featured employer badge</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-bold">Enterprise</CardTitle>
                  <CardDescription>Contact us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">
                    Custom solutions for large teams.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Dedicated account manager</li>
                    <li>Custom integrations</li>
                    <li>Advanced analytics</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900">You're All Set!</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your employer profile is now complete. You can start posting jobs and connecting with students.
            </p>
            
            <Button>
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      
      default:
        return <div>Step content</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500">{step.subtitle}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-full mt-4 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerOnboardingFlow;
