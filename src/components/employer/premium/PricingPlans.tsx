
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { supabase } from '@/integrations/supabase/client';

const employerPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Get started with essential job posting features',
    features: [
      'Basic job postings',
      'Unlimited applications',
      'Standard visibility'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'free'
  },
  {
    name: 'Premium Post',
    price: '$25',
    period: 'per post',
    description: 'Enhanced visibility for individual job postings',
    features: [
      'Custom branded profile',
      'Priority placement in search results',
      'Company logo featured on listing',
      'Basic analytics (views and applies)'
    ],
    buttonText: 'Purchase',
    popular: true,
    planId: 'premium_post'
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'Complete solution for high-volume hiring',
    features: [
      'Unlimited premium job postings',
      'Full analytics dashboard',
      'Priority support',
      'Candidate matching tools',
      'Bulk posting capabilities'
    ],
    buttonText: 'Subscribe Now',
    popular: false,
    planId: 'enterprise_analytics'
  }
];

const schoolPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Basic tools for school career counselors',
    features: [
      'Student job access',
      'Job approval tools',
      'Basic support'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'school_free'
  },
  {
    name: 'Premium',
    price: '$500',
    period: 'per year',
    description: 'Advanced features for school career departments',
    features: [
      'Counselor dashboard',
      'Student analytics',
      'Branded portal',
      'Priority support',
      'Career event management'
    ],
    buttonText: 'Sign Up',
    popular: true,
    planId: 'school_premium'
  }
];

const PricingPlans = () => {
  const { toast } = useToast();
  const { purchasePremiumPost, isLoading } = usePremiumFeatures();
  const [isEmployer, setIsEmployer] = useState(true);

  const handleSubscribe = async (planId: string) => {
    // For non-employer plans or free plans, just show message
    if (planId.startsWith('school_') || planId === 'free') {
      toast({
        title: "Coming Soon",
        description: "This plan is coming soon. Please check back later.",
      });
      return;
    }
    
    // For enterprise plan, show contact message
    if (planId === 'enterprise_analytics') {
      toast({
        title: "Contact Sales",
        description: "Our sales team will contact you shortly to discuss enterprise options.",
      });
      return;
    }
    
    try {
      // For demo purposes, we'll use the first job in the jobs table
      // In a real implementation, you would select the specific job to upgrade
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id')
        .limit(1)
        .single();
        
      if (!jobs?.id) {
        toast({
          title: "No Job Found",
          description: "Please create a job posting before purchasing a premium plan.",
          variant: "destructive",
        });
        return;
      }
      
      await purchasePremiumPost({
        jobId: jobs.id,
        includeAnalytics: planId === 'premium_analytics_post'
      });
      
    } catch (error: any) {
      console.error('Error initiating subscription:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem processing your request.",
        variant: "destructive",
      });
    }
  };
  
  const plans = isEmployer ? employerPlans : schoolPlans;
  
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-2">Pricing Plans</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
        Simple, affordable plans for employers and schools. Students always use our platform for free.
      </p>
      
      {/* Toggle between Employer and School plans */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm mb-8">
          <Button
            variant={isEmployer ? "default" : "outline"}
            onClick={() => setIsEmployer(true)}
            className="rounded-r-none"
          >
            For Employers
          </Button>
          <Button
            variant={!isEmployer ? "default" : "outline"}
            onClick={() => setIsEmployer(false)}
            className="rounded-l-none"
          >
            For Schools
          </Button>
        </div>
      </div>
      
      <div className={`grid ${isEmployer ? 'md:grid-cols-3' : 'md:grid-cols-2 md:max-w-4xl mx-auto'} gap-6`}>
        {plans.map((plan) => (
          <Card 
            key={plan.planId}
            className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${plan.popular ? 'bg-primary' : ''}`}
                onClick={() => handleSubscribe(plan.planId)}
                disabled={isLoading}
                variant={plan.planId === 'free' || plan.planId === 'school_free' ? 'outline' : 'default'}
              >
                {isLoading ? "Processing..." : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
