
import React from 'react';
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

const plans = [
  {
    name: 'Premium Post',
    price: '$25',
    period: 'per post',
    description: 'Enhanced visibility for individual job postings',
    features: [
      'Custom branded profile',
      'Priority placement in search results',
      'Company logo featured on listing',
      'Basic analytics (views and applies)',
      'Higher visibility to candidates'
    ],
    buttonText: 'Purchase',
    popular: false,
    planId: 'premium_post'
  },
  {
    name: 'Premium Post + Analytics',
    price: '$50',
    period: 'per post',
    description: 'Advanced analytics for individual postings',
    features: [
      'All Premium Post features',
      'Detailed applicant statistics',
      'Skill match scoring',
      'Applicant demographics',
      'Conversion rate analytics',
      'Comparison with industry benchmarks',
      'Weekly engagement reports'
    ],
    buttonText: 'Purchase',
    popular: true,
    planId: 'premium_analytics_post'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Complete solution for high-volume hiring',
    features: [
      'Unlimited premium job postings',
      'Custom reporting dashboards',
      'AI-powered candidate matching',
      'Real-time analytics',
      'Priority feature development',
      'Dedicated account manager',
      'Bulk posting tools'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    planId: 'enterprise_analytics'
  }
];

const PricingPlans = () => {
  const { toast } = useToast();

  const handleSubscribe = (planId: string) => {
    // In a real implementation, this would redirect to a payment gateway or Stripe checkout
    if (planId === 'enterprise_analytics') {
      toast({
        title: "Contact Sales",
        description: "Our sales team will contact you shortly to discuss enterprise options.",
      });
    } else {
      toast({
        title: "Purchase Process",
        description: "Redirecting to payment gateway...",
      });
      
      // Mock payment gateway redirect
      setTimeout(() => {
        toast({
          title: "Demo Only",
          description: "In a production environment, this would connect to a payment processor.",
        });
      }, 2000);
    }
  };
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.planId}
            className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}
          >
            {plan.popular && (
              <>
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
                <div className="absolute inset-0 border border-amber-500/30 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse-slow glow-amber pointer-events-none"></div>
              </>
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
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
