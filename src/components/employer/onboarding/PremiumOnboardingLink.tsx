
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, ArrowRight, CheckCircle } from 'lucide-react';

const PremiumOnboardingLink: React.FC = () => {
  const features = [
    "Complete business verification process",
    "Premium job posting capabilities", 
    "Advanced candidate matching",
    "Detailed analytics dashboard",
    "Priority customer support"
  ];

  return (
    <Card className="border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-sky-900">Premium Employer Onboarding</CardTitle>
              <CardDescription className="text-sky-700">
                Complete verification and unlock all premium features
              </CardDescription>
            </div>
          </div>
          <Badge variant="skyBlue" size="lg">
            Premium
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-sky-600" />
              <span className="text-sm text-sky-800">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-sky-100 border border-sky-200 rounded-lg p-4">
          <p className="text-sm text-sky-800 font-medium">
            Start your comprehensive onboarding process including business verification, 
            premium features setup, and complete platform integration.
          </p>
        </div>
        
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg"
          size="lg"
        >
          <Link to="/employer-onboarding" className="flex items-center justify-center gap-2">
            Start Premium Onboarding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumOnboardingLink;
