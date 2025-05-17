
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { supabase } from '@/integrations/supabase/client';
import PricingToggle from '@/components/pricing/PricingToggle';
import PlanCard from '@/components/pricing/PlanCard';

// Define pricing plans data
const pricingData = {
  free: {
    name: "Free",
    description: "For individuals starting out, with 5 meetings per month complete with summaries, transcription, and search.",
    price: {
      monthly: "$0",
      annual: "$0",
    },
    features: [
      "5 meeting transcripts per month",
      "Best-in-class summaries",
      "Personalized meeting coach",
      "Basic integrations",
      "Topic Readouts",
      "16+ languages supported",
      "iOS mobile app (Android coming!)"
    ],
    includedFeatures: [],
    ctaText: "Get Started",
    ctaLink: "/employer-dashboard"
  },
  pro: {
    name: "Pro",
    description: "For individuals and small teams who want basic transcription, search, and premium integrations.",
    price: {
      monthly: "$15",
      annual: "$11.40",
    },
    features: [
      "Workspace access for team collaboration",
      "100 files upload credits /mo",
      "Premium integrations (Notion, Salesforce, HubSpot, Jira, Confluence, Zapier, webhooks)"
    ],
    includedFeatures: [
      "Unlimited meeting reports",
      "Unlimited storage",
      "Workspace access"
    ],
    ctaText: "Subscribe",
    ctaLink: "/employer/premium"
  },
  enterprise: {
    name: "Enterprise",
    description: "For individuals and teams who want video playback and other supercharged capabilities.",
    price: {
      monthly: "$22.50",
      annual: "$16.70",
    },
    features: [
      "Meeting playback",
      "Video highlights",
      "200 file upload credits /mo",
      "Premium support"
    ],
    includedFeatures: [
      "Unlimited meeting reports",
      "Unlimited storage",
      "Workspace access"
    ],
    ctaText: "Get Enterprise",
    ctaLink: "/employer/premium"
  },
  enterprisePlus: {
    name: "Enterprise+",
    description: "For larger teams and organizations who need security and controls for scale.",
    price: {
      monthly: "$29.75",
      annual: "$22.50",
    },
    features: [
      "HIPAA compliance",
      "SSO & SAML",
      "Domain capture",
      "Custom data retention policy",
      "300 file upload credits /mo",
      "Workspace onboarding"
    ],
    includedFeatures: [
      "Unlimited meeting reports",
      "Unlimited storage",
      "Workspace access"
    ],
    customBadge: "Requires 10+ licenses",
    ctaText: "Talk to sales",
    ctaLink: "/contact"
  }
};

const PricingPlans = () => {
  const { toast } = useToast();
  const { purchasePremiumPost, isLoading } = usePremiumFeatures();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSubscribe = async (planId: string) => {
    // For non-employer plans or free plans, just show message
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
        includeAnalytics: planId === 'enterprise' || planId === 'enterprisePlus'
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
        Choose the plan that's right for your needs, with no hidden fees or long-term commitments.
      </p>
      
      <div className="flex justify-center mb-8">
        <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <PlanCard 
          {...pricingData.free}
          isAnnual={isAnnual}
        />
        <PlanCard 
          {...pricingData.pro}
          isAnnual={isAnnual}
        />
        <PlanCard 
          {...pricingData.enterprise}
          isAnnual={isAnnual}
          isPopular={true}
        />
        <PlanCard 
          {...pricingData.enterprisePlus}
          isAnnual={isAnnual}
        />
      </div>
    </div>
  );
};

export default PricingPlans;
