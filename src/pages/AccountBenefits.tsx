
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import UserBenefitsCard from '@/components/user/UserBenefitsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useFadeIn } from '@/utils/animations';
import { GraduationCap, Briefcase, Crown, ArrowRight, BookOpen } from 'lucide-react';

const AccountBenefits: React.FC = () => {
  const { userProfile } = useAuth();
  const fadeIn = useFadeIn(300);

  const getAccountTypeDetails = () => {
    switch (userProfile?.user_type) {
      case 'student':
        return {
          title: 'Student Account',
          icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
          description: 'Access to premium student features for your career journey',
          color: 'bg-blue-50 border-blue-200'
        };
      case 'employer':
        return {
          title: 'Employer Account',
          icon: <Briefcase className="h-8 w-8 text-amber-500" />,
          description: 'Premium tools to connect with talented students',
          color: 'bg-amber-50 border-amber-200'
        };
      case 'teacher':
        return {
          title: 'Teacher Account',
          icon: <BookOpen className="h-8 w-8 text-green-500" />,
          description: 'Resources to guide students in their career development',
          color: 'bg-green-50 border-green-200'
        };
      case 'admin':
        return {
          title: 'Chief Executive Officer',
          icon: <Crown className="h-8 w-8 text-black" />,
          description: 'Full platform administration and management capabilities',
          color: 'bg-gray-100 border-gray-400'
        };
      default:
        return {
          title: 'Basic Account',
          icon: <Crown className="h-8 w-8 text-gray-500" />,
          description: 'Standard features for job seekers',
          color: 'bg-gray-50 border-gray-200'
        };
    }
  };

  const details = getAccountTypeDetails();

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 max-w-4xl ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Benefits</h1>
          <p className="text-muted-foreground">
            View all the features and benefits of your current account
          </p>
        </div>

        <Card className={`mb-8 ${details.color}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="p-4 rounded-full bg-background">
                {details.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {details.title}
                  {userProfile?.redeemed_at && (
                    <Badge variant="outline" className="ml-2">Premium</Badge>
                  )}
                </h2>
                <p className="text-muted-foreground">{details.description}</p>
              </div>
              {!userProfile?.redeemed_at && userProfile?.user_type !== 'admin' && (
                <Button asChild>
                  <Link to="/redeem-code">
                    Upgrade Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <UserBenefitsCard userProfile={userProfile} />

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
      </div>
    </Layout>
  );
};

export default AccountBenefits;
