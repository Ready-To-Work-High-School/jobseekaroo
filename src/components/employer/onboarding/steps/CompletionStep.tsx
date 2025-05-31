
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, ArrowRight, Calendar, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompletionStepProps {
  data: any;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ data }) => {
  const completionItems = [
    {
      icon: CheckCircle,
      title: "Account Created",
      description: "Your employer account is set up and ready",
      completed: true
    },
    {
      icon: Users,
      title: "Company Profile",
      description: "Your company information has been saved",
      completed: !!data.company?.companyName
    },
    {
      icon: Target,
      title: "Verification Started",
      description: "Your business verification is in progress",
      completed: !!data.verification?.verificationStarted
    }
  ];

  const nextSteps = [
    {
      icon: Calendar,
      title: "Complete Verification",
      description: "Finish your business verification process",
      action: "Complete Now"
    },
    {
      icon: Target,
      title: "Post Your First Job",
      description: "Create a job posting to start finding candidates",
      action: "Create Job"
    },
    {
      icon: Users,
      title: "Explore Features",
      description: "Discover all the tools available in your dashboard",
      action: "View Dashboard"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <Sparkles className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <CardTitle className="text-3xl text-green-900 mb-2">
            Welcome to the Platform! 🎉
          </CardTitle>
          <CardDescription className="text-lg text-green-700">
            Your onboarding is complete. You're now ready to connect with talented high school students.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              Onboarding Complete
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-center mb-4">What You've Accomplished</h3>
            {completionItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-4 w-4 ${
                      item.completed ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {item.completed && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Next Steps</CardTitle>
          <CardDescription>
            Continue building your presence on the platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {nextSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {step.action}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center pt-6">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionStep;
