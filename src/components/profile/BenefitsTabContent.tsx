
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UserProfile } from '@/types/user';
import UserBenefitsCard from '@/components/user/UserBenefitsCard';

interface BenefitsTabContentProps {
  userProfile: UserProfile | null;
}

const BenefitsTabContent: React.FC<BenefitsTabContentProps> = ({ userProfile }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Account Benefits</CardTitle>
            <Button asChild>
              <Link to="/account-benefits">
                View All Benefits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CardDescription>
            View the features and benefits of your current account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserBenefitsCard userProfile={userProfile} />
        </CardContent>
      </Card>
      {!userProfile?.redeemed_at && (
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Unlock Premium Features</CardTitle>
            <CardDescription>
              Enter a redemption code to upgrade your account and access premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/redeem-code">
                Redeem Code Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BenefitsTabContent;
