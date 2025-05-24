
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Crown, Zap, Shield, Target, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PremiumFeaturesPage = () => {
  const premiumFeatures = [
    {
      icon: Target,
      title: "Priority Job Placement",
      description: "Your job listings appear at the top of search results and get 3x more visibility."
    },
    {
      icon: Users,
      title: "Advanced Candidate Filtering",
      description: "Filter candidates by skills, experience, location, and custom criteria."
    },
    {
      icon: MessageSquare,
      title: "Direct Candidate Messaging",
      description: "Communicate directly with candidates without waiting for applications."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Get insights on job performance, candidate quality, and hiring metrics."
    },
    {
      icon: Shield,
      title: "Verified Employer Badge",
      description: "Build trust with candidates through our verification program."
    },
    {
      icon: Crown,
      title: "Premium Support",
      description: "Get priority customer support and dedicated account management."
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Post up to 2 jobs",
        "Basic applicant tracking",
        "Standard job visibility",
        "Email support"
      ],
      current: true
    },
    {
      name: "Professional",
      price: "$99/month",
      features: [
        "Unlimited job postings",
        "Priority placement",
        "Advanced analytics",
        "Candidate messaging",
        "Phone support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "24/7 support"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-4">
            <Star className="h-8 w-8 text-yellow-500" />
            Premium Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful tools to streamline your hiring process and find the best candidates faster
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Premium
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">{plan.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">Ready to Upgrade?</h3>
            <p className="text-blue-700 mb-4">
              Join thousands of employers who have streamlined their hiring process with our premium features.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PremiumFeaturesPage;
