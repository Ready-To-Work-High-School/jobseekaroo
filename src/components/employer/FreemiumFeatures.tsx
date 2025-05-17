
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumPostings } from '@/hooks/usePremiumPostings';
import { motion } from 'framer-motion';
import { Star, Sparkles, Check, Clock, TrendingUp } from 'lucide-react';
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
    free: [
      "Up to 3 active job postings",
      "Basic candidate search",
      "Standard visibility",
      "3-stage recruitment pipeline",
      "Basic company profile",
      "Limited candidate messaging"
    ],
    premium: [
      "Unlimited premium job postings",
      "Featured placement in search results",
      "Custom recruitment pipeline stages",
      "Advanced candidate tracking board",
      "Full analytics dashboard",
      "Unlimited candidate messaging",
      "AI-powered candidate matching"
    ]
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Choose How to Post Your Job</CardTitle>
        <CardDescription>
          Post for free or upgrade to premium for enhanced visibility and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="free" className="mt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="free">Free Posting</TabsTrigger>
            <TabsTrigger value="premium">Premium Posting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="free">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Free Job Posting</h3>
                  <p className="text-sm text-muted-foreground">No payment required</p>
                </div>
                <div className="text-xl font-bold">$0</div>
              </div>
              
              <ul className="space-y-2">
                {features.free.map((feature, index) => (
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
                Continue with Free Posting
              </Button>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="premium">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">Premium Posting</h3>
                    <Sparkles className="h-4 w-4 ml-2 text-amber-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">$59/month after trial</p>
                </div>
                <div className="text-xl font-bold">
                  {isEligibleForTrial ? (
                    <span className="flex items-center text-green-600">
                      <Clock className="h-4 w-4 mr-1" />
                      30-day free
                    </span>
                  ) : (
                    "$59"
                  )}
                </div>
              </div>
              
              <ul className="space-y-2">
                {features.premium.map((feature, index) => (
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
                {isLoading ? "Processing..." : isEligibleForTrial ? "Start Free Trial" : "Upgrade to Premium"}
              </Button>
              
              {!isEligibleForTrial && (
                <p className="text-xs text-center text-muted-foreground">
                  You've already used your free trial. Subscribe to continue with premium features.
                </p>
              )}
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
