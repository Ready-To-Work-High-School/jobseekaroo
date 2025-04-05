
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
    name: 'Basic Analytics',
    price: '$49.99',
    period: 'monthly',
    description: 'Essential analytics for small businesses',
    features: [
      'Basic application tracking',
      'Demographics overview',
      'Limited engagement metrics',
      'Monthly reports',
      '1 user access'
    ],
    buttonText: 'Subscribe',
    popular: false,
    planId: 'basic_analytics'
  },
  {
    name: 'Premium Analytics',
    price: '$99.99',
    period: 'monthly',
    description: 'Advanced analytics for growing companies',
    features: [
      'Advanced application tracking',
      'Detailed demographic insights',
      'Real-time engagement metrics',
      'Weekly reports',
      'Company profile customization',
      'Featured job postings',
      'Up to 5 user access'
    ],
    buttonText: 'Subscribe',
    popular: true,
    planId: 'premium_analytics'
  },
  {
    name: 'Enterprise',
    price: '$199.99',
    period: 'monthly',
    description: 'Complete analytics suite for large organizations',
    features: [
      'Comprehensive application tracking',
      'Custom reporting dashboards',
      'AI-powered candidate matching',
      'Real-time analytics',
      'Priority feature development',
      'Premium company profile',
      'Unlimited user access'
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
        title: "Subscription Process",
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
            className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}
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
                <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
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
