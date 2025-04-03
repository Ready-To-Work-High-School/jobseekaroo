
import React from 'react';
import Layout from '@/components/Layout';
import RedemptionCodeForm from '@/components/auth/RedemptionCodeForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';

const RedemptionCode: React.FC = () => {
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-12 max-w-md ${fadeIn}`}>
        <Card className="border-amber-200 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Redeem Access Code</CardTitle>
            <CardDescription>
              Enter your redemption code to unlock premium features for students and employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RedemptionCodeForm redirectTo="/profile" />
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>If you're a student or employer and don't have a code yet,</p>
          <p>please contact your program coordinator at Westside High School.</p>
        </div>
      </div>
    </Layout>
  );
};

export default RedemptionCode;
