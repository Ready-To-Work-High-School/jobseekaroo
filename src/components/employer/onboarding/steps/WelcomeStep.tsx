
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Shield, Zap, Building2 } from 'lucide-react';

interface WelcomeStepProps {
  onComplete: (data: any) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onComplete }) => {
  const benefits = [
    {
      icon: Users,
      title: "Pre-Boarding Excellence",
      description: "Streamlined pre-boarding process to engage new hires before day one"
    },
    {
      icon: Shield,
      title: "Employee Verification",
      description: "Comprehensive verification system with automated background checks"
    },
    {
      icon: Zap,
      title: "First 5 Days Framework",
      description: "Structured acclimation program to integrate new hires into your culture"
    },
    {
      icon: Building2,
      title: "Custom Onboarding Tools",
      description: "Tailored onboarding workflows designed for your company's needs"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <Building2 className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <CardTitle className="text-3xl text-green-900 mb-2">
            Welcome to JS4HS Employer Onboarding!
          </CardTitle>
          <CardDescription className="text-lg text-green-700">
            Transform your hiring process with our comprehensive onboarding platform designed 
            to seamlessly guide new hires from pre-boarding through their first 5 days.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              🚀 Complete Onboarding Solution
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-green-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">{benefit.title}</h4>
                    <p className="text-sm text-green-700">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Your Complete Onboarding Journey</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Our platform provides customizable onboarding workflows that handle everything from 
                  pre-boarding engagement to employee verification and a structured first 5 days program 
                  that helps new hires quickly acclimate to your company culture.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button 
              size="lg" 
              onClick={() => onComplete({})}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Start Building Your Onboarding Experience!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeStep;
