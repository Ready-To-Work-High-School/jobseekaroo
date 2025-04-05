
import React from 'react';
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ActiveSubscription = () => {
  const { toast } = useToast();
  
  // This would come from your actual subscription data in a real implementation
  const subscriptionData = {
    plan: 'Premium Analytics',
    status: 'active',
    nextBillingDate: '2023-12-01',
    amount: '$99.99',
    features: [
      'Advanced application tracking',
      'Detailed demographic insights',
      'Real-time engagement metrics',
      'Weekly reports',
      'Company profile customization',
      'Featured job postings',
      'Up to 5 user access'
    ]
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Confirmation Required",
      description: "Please confirm that you want to cancel your subscription.",
    });
  };
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Your Current Subscription</h2>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{subscriptionData.plan}</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Your subscription is {subscriptionData.status}
              </CardDescription>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Next billing date</span>
              </div>
              <span className="font-medium">{subscriptionData.nextBillingDate}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Amount</span>
              </div>
              <span className="font-medium">{subscriptionData.amount}</span>
            </div>
            
            <h3 className="font-medium text-lg mt-6 mb-2">Included Features</h3>
            <ul className="space-y-2">
              {subscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Manage Billing</Button>
          <Button variant="destructive" onClick={handleCancelSubscription}>Cancel Subscription</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActiveSubscription;
