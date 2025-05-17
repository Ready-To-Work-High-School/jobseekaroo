
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumPostings } from '@/hooks/usePremiumPostings';
import { motion } from 'framer-motion';
import { Star, Sparkles, Check, Clock, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FreemiumFeaturesProps {
  jobId?: string;
}

const FreemiumFeatures: React.FC<FreemiumFeaturesProps> = ({ jobId }) => {
  const { toast } = useToast();
  const { checkTrialEligibility, startPremiumTrial, isLoading } = usePremiumPostings();
  const [isEligibleForTrial, setIsEligibleForTrial] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState('basic');
  
  React.useEffect(() => {
    const checkEligibility = async () => {
      const eligible = await checkTrialEligibility();
      setIsEligibleForTrial(eligible);
    };
    
    checkEligibility();
  }, []);
  
  const handleStartTrial = async () => {
    if (!jobId) {
      toast({
        title: "No job selected",
        description: "Please create a job posting first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await startPremiumTrial(jobId);
      toast({
        title: "Free trial activated!",
        description: "Your job has been upgraded to premium for 30 days.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not start premium trial",
        variant: "destructive",
      });
    }
  };
  
  const features = {
    basic: [
      "Up to 3 active job postings",
      "Basic company profile",
      "Company name and logo",
      "Simple candidate messaging",
      "Basic applicant tracking"
    ],
    pro: [
      "Unlimited premium job postings",
      "Enhanced candidate search",
      "Priority placement in search results",
      "Custom branded company profile",
      "Analytics dashboard",
      "Unlimited candidate messaging",
      "Featured employer badge",
      "AI-powered candidate matching",
      "Custom recruitment workflows",
      "Priority support"
    ],
    enterprise: [
      "All Pro features included",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "Advanced analytics and reporting",
      "Customized job matching algorithms",
      "Employer branding solutions",
      "Multi-user access with roles",
      "Bulk job posting",
      "Enhanced security features"
    ]
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Choose Your Plan</CardTitle>
        <CardDescription>
          Select the tier that best fits your hiring needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="mt-2" onValueChange={setSelectedTier}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="pro">Pro</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Basic Plan</h3>
                  <p className="text-sm text-muted-foreground">For small businesses and startups</p>
                </div>
                <div className="text-xl font-bold">$0</div>
              </div>
              
              <ul className="space-y-2">
                {features.basic.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  Perfect for small businesses looking to hire high school talent with basic job postings.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                Continue with Free Plan
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="pro">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">Pro Plan</h3>
                    <Sparkles className="h-4 w-4 ml-2 text-amber-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">$30/month after trial</p>
                </div>
                <div className="text-xl font-bold">
                  {isEligibleForTrial ? (
                    <span className="flex items-center text-green-600">
                      <Clock className="h-4 w-4 mr-1" />
                      30-day free
                    </span>
                  ) : (
                    "$30"
                  )}
                </div>
              </div>
              
              <ul className="space-y-2">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-amber-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-amber-50 border border-amber-100 rounded-md p-4 flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Boost application rates</p>
                  <p className="mt-1">Premium job postings receive up to 3x more qualified applications from high school students.</p>
                </div>
              </div>
              
              <Button 
                onClick={handleStartTrial}
                disabled={!isEligibleForTrial || isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {isLoading ? "Processing..." : isEligibleForTrial ? "Start Free Trial" : "Upgrade to Pro"}
              </Button>
              
              {!isEligibleForTrial && (
                <p className="text-xs text-center text-muted-foreground">
                  You've already used your free trial. Subscribe to continue with premium features.
                </p>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="enterprise">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">Enterprise Plan</h3>
                    <Crown className="h-4 w-4 ml-2 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">For large organizations</p>
                </div>
                <div className="text-xl font-bold">$99</div>
              </div>
              
              <ul className="space-y-2">
                {features.enterprise.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-start gap-3">
                <Crown className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Custom Enterprise Solutions</p>
                  <p className="mt-1">Tailored features and dedicated support for large-scale hiring needs.</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Contact Sales
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">
          All plans include access to our high school talent pool. Premium features can be canceled anytime.
        </p>
      </CardFooter>
    </Card>
  );
};

export default FreemiumFeatures;
