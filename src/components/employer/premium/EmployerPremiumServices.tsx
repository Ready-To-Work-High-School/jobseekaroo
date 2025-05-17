
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, Star, Sparkles } from 'lucide-react';

const EmployerPremiumServices = () => {
  return (
    <Card className="border-amber-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-white border-b">
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 mr-2 text-amber-500" />
          <CardTitle>Premium Employer Services</CardTitle>
        </div>
        <CardDescription>
          Enhance your recruiting experience with our advanced employer tools
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
              Premium Features
            </h3>
            <ul className="space-y-2">
              {[
                'Featured job listings at the top of search results',
                'Candidate matching algorithm with compatibility scores',
                'Advanced applicant analytics and reporting',
                'Customizable screening questions for applications'
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              Additional Benefits
            </h3>
            <ul className="space-y-2">
              {[
                'Direct messaging with qualified candidates',
                'Virtual interview scheduling and management',
                'School career advisor partnerships',
                'Employer branding and profile customization'
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <p className="text-sm text-muted-foreground">
          Starting at $49/month
        </p>
        <Button asChild variant="outline">
          <Link to="/employer/premium-features">
            Learn More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployerPremiumServices;
