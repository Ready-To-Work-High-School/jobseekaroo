
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Sparkles, Star, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PremiumServices = () => {
  const fadeIn = useFadeIn(300);

  const features = {
    basic: [
      "Up to 3 job postings",
      "Basic company profile",
      "Company name and logo",
      "Simple candidate messaging",
      "Basic applicant tracking"
    ],
    pro: [
      "All Basic features",
      "Unlimited job postings",
      "Featured placement in search",
      "Enhanced company profile",
      "Priority support",
      "Analytics dashboard",
      "Custom branding",
      "Candidate skill matching",
      "Unlimited messaging",
      "Applicant tracking system"
    ],
    enterprise: [
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "Advanced analytics",
      "Custom reporting",
      "Multi-user access",
      "Bulk job posting",
      "Enhanced security",
      "SLA guarantees"
    ]
  };

  return (
    <Layout>
      <div className={`container max-w-6xl mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Premium Services
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sparkles className="h-6 w-6 text-amber-500" />
              </motion.div>
            </h1>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find the perfect tier that suits your hiring needs and business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Basic</CardTitle>
              <CardDescription>Essential features for small businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">Free</div>
              <ul className="space-y-2">
                {features.basic.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-amber-500 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                Pro <Star className="h-4 w-4 ml-2 text-amber-500" />
              </CardTitle>
              <CardDescription>Advanced features for growing businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">$30<span className="text-lg font-normal">/mo</span></div>
              <ul className="space-y-2">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                Enterprise <Crown className="h-4 w-4 ml-2 text-blue-500" />
              </CardTitle>
              <CardDescription>Custom solutions for large organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">$99<span className="text-lg font-normal">/mo</span></div>
              <ul className="space-y-2">
                {features.enterprise.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <div>
              <h4 className="font-medium mb-2">How do I upgrade my account?</h4>
              <p className="text-muted-foreground">You can upgrade your account by selecting a plan above and following the payment process.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Can I switch between different tiers?</h4>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your subscription at any time from your account settings.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Do you offer refunds?</h4>
              <p className="text-muted-foreground">We offer a 14-day money-back guarantee for all premium subscriptions.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumServices;
