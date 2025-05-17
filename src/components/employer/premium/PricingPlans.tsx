
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { supabase } from '@/lib/supabase';
import PlanGrid from './PlanGrid';
import { employerPlans } from './pricingData';

const PricingPlans = () => {
  const { toast } = useToast();
  const { purchasePremiumPost, isLoading } = usePremiumFeatures();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSubscribe = async (planId: string) => {
    // For free plan, just show message
    if (planId === 'free') {
      toast({
        title: "Free Plan Selected",
        description: "You can start using our free features immediately.",
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
        includeAnalytics: planId === 'pro' || planId === 'enterprise'
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
  
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-2">Simple, Transparent Pricing</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
        Choose the plan that's right for your business, with no hidden fees or long-term commitments.
      </p>
      
      <PlanGrid 
        plans={employerPlans} 
        isEmployer={true} 
        handleSubscribe={handleSubscribe}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PricingPlans;
