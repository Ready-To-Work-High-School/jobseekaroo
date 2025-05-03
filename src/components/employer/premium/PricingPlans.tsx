
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { supabase } from '@/integrations/supabase/client';
import PlanToggle from './PlanToggle';
import PlanGrid from './PlanGrid';
import { employerPlans, schoolPlans } from './pricingData';

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
        includeAnalytics: true
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
        <PlanToggle isEmployer={isEmployer} setIsEmployer={setIsEmployer} />
      </div>
      
      <PlanGrid 
        plans={plans}
        isEmployer={isEmployer}
        handleSubscribe={handleSubscribe}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PricingPlans;
