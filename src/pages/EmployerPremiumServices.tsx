
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import PricingPlans from '@/components/employer/premium/PricingPlans';
import PremiumFeaturesList from '@/components/employer/premium/PremiumFeaturesList';
import ActiveSubscription from '@/components/employer/premium/ActiveSubscription';
import { Separator } from '@/components/ui/separator';
import ValueProposition from '@/components/employer/premium/ValueProposition';
import AnimatedStar from '@/components/animations/AnimatedStar';

const EmployerPremiumServices = () => {
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // In a real implementation, this would come from Supabase or your backend
  const hasPremiumSubscription = userProfile?.preferences?.hasPremium === true;

  return (
    <Layout>
      <div className={`container max-w-5xl mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-1/4 -translate-y-1/2">
            <AnimatedStar />
          </div>
          <h1 className="text-3xl font-bold mb-2">Premium Fees for Employers</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Employers get customized job profiles and powerful data analytics to find the perfect candidates faster and with better results.
          </p>
          <div className="mt-4 bg-amber-50 border border-amber-100 p-4 rounded-md dark:bg-amber-950/30 dark:border-amber-900/50">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Employers receive customized job profiles (branded listings, priority placement) and comprehensive data analytics 
              (applicant statistics, skill match scores) to streamline their hiring process and improve candidate selection.
            </p>
          </div>
        </div>
        
        {hasPremiumSubscription ? (
          <ActiveSubscription />
        ) : (
          <>
            <ValueProposition />
            <Separator className="my-10" />
            <PremiumFeaturesList />
            <Separator className="my-12" />
            <PricingPlans />
          </>
        )}
      </div>
    </Layout>
  );
};

export default EmployerPremiumServices;
