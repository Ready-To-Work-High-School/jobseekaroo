
import React from 'react';
import Layout from '@/components/Layout';
import RedemptionCodeForm from '@/components/auth/RedemptionCodeForm';
import { useFadeIn } from '@/utils/animations';

const RedemptionCode: React.FC = () => {
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto py-8 px-4 ${fadeIn}`}>
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Redemption Code</h1>
          <p className="text-center text-muted-foreground mb-8">
            Enter your redemption code to unlock premium features
          </p>
          
          <RedemptionCodeForm redirectTo="/dashboard" />
        </div>
      </div>
    </Layout>
  );
};

export default RedemptionCode;
