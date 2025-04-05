
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import PricingPlans from '@/components/employer/premium/PricingPlans';
import PremiumFeaturesList from '@/components/employer/premium/PremiumFeaturesList';
import ActiveSubscription from '@/components/employer/premium/ActiveSubscription';
import { Separator } from '@/components/ui/separator';

const EmployerPremiumServices = () => {
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // In a real implementation, this would come from Supabase or your backend
  const hasPremiumSubscription = userProfile?.preferences?.hasPremium === true;

  return (
    <Layout>
      <div className={`container max-w-5xl mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Premium Services</h1>
          <p className="text-muted-foreground">
            Enhance your recruiting capabilities with premium analytics and features
          </p>
        </div>
        
        {hasPremiumSubscription ? (
          <ActiveSubscription />
        ) : (
          <>
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
