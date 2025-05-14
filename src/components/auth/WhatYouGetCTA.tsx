
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WhatYouGetCTA = () => {
  const { user } = useAuth();
  
  const benefits = [
    "Access to top employers in Jacksonville",
    "Free career guidance and job-readiness tools",
    "Interview preparation and resume building",
    "Specialized programs for high school students",
    "Personalized job recommendations"
  ];
  
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm mt-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">What You Get with Job Seekers 4 HS</h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            {!user ? (
              <>
                <Button asChild className="w-full">
                  <Link to="/sign-up">Sign Up Free</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              </>
            ) : (
              <Button asChild className="w-full">
                <Link to="/jobs">Find Jobs</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatYouGetCTA;
