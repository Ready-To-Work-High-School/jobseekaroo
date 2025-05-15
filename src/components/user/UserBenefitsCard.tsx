
import React from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/auth';
import { UserProfile } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface BenefitItem {
  name: string;
  included: boolean;
  highlightFeature?: boolean;
}

interface UserBenefitsCardProps {
  userProfile: UserProfile;
  onRedeemClick?: () => void;
  showRedeemButton?: boolean;
}

const UserBenefitsCard: React.FC<UserBenefitsCardProps> = ({
  userProfile,
  onRedeemClick,
  showRedeemButton = true,
}) => {
  // Define benefits for different user types
  const studentBenefits: BenefitItem[] = [
    { name: 'Exclusive job listings', included: true, highlightFeature: true },
    { name: 'Professional profile', included: true },
    { name: 'Resume builder tools', included: true },
    { name: 'Interview preparation', included: true },
    { name: 'Job application tracking', included: true },
    { name: 'Career coaching access', included: false },
    { name: 'Advanced analytics', included: false },
  ];

  const employerBenefits: BenefitItem[] = [
    { name: 'Post job listings', included: true },
    { name: 'Student profile search', included: true },
    { name: 'Basic analytics', included: true },
    { name: 'Featured listings', included: false },
    { name: 'Automatic matching', included: false },
    { name: 'Premium analytics', included: false },
    { name: 'Employer branding', included: false },
  ];

  const teacherBenefits: BenefitItem[] = [
    { name: 'Student progress tracking', included: true, highlightFeature: true },
    { name: 'Employer connections', included: true },
    { name: 'Job recommendation tools', included: true },
    { name: 'Classroom reporting', included: true },
    { name: 'Career curriculum resources', included: true },
    { name: 'Premium analytics', included: false },
    { name: 'Advanced student placement', included: false },
  ];

  const adminBenefits: BenefitItem[] = [
    { name: 'Full platform access', included: true, highlightFeature: true },
    { name: 'User management', included: true },
    { name: 'Analytics dashboard', included: true },
    { name: 'Job listing approval', included: true },
    { name: 'Student verification', included: true },
    { name: 'Employer verification', included: true },
    { name: 'System configuration', included: true },
  ];

  const basicBenefits: BenefitItem[] = [
    { name: 'Browse job listings', included: true },
    { name: 'Basic profile', included: true },
    { name: 'Job search filters', included: true },
    { name: 'Application tracking', included: false },
    { name: 'Career resources', included: false },
    { name: 'Employer messaging', included: false },
    { name: 'Premium features', included: false },
  ];

  // Choose the right benefits list based on user type
  let benefits: BenefitItem[] = basicBenefits;
  let userTypeLabel = 'Basic User';
  let hasRedeemedCode = false;

  if (userProfile.user_type === 'student') {
    benefits = studentBenefits;
    userTypeLabel = 'Student';
    hasRedeemedCode = !!userProfile.redeemed_at;
  } else if (userProfile.user_type === 'employer') {
    benefits = employerBenefits;
    userTypeLabel = 'Employer';
  } else if (userProfile.user_type === 'teacher') {
    benefits = teacherBenefits;
    userTypeLabel = 'Teacher';
    hasRedeemedCode = !!userProfile.redeemed_at;
  } else if (userProfile.user_type === 'admin') {
    benefits = adminBenefits;
    userTypeLabel = 'Administrator';
  }

  const redemptionDate = userProfile.redeemed_at ? new Date(userProfile.redeemed_at) : null;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{userTypeLabel} Account</CardTitle>
            <CardDescription className="mt-1">
              Your account features and benefits
            </CardDescription>
          </div>
          <Badge variant={userProfile.user_type === 'admin' ? 'destructive' : 'default'}>
            {userTypeLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {redemptionDate && (
            <Alert className="bg-green-50 border-green-200">
              <Info className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Account Activated</AlertTitle>
              <AlertDescription className="text-green-700">
                Your account was activated {formatDistanceToNow(redemptionDate, { addSuffix: true })}
              </AlertDescription>
            </Alert>
          )}

          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 py-1">
                {benefit.included ? (
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                )}
                <span className={`${!benefit.included ? 'text-gray-400' : ''} ${benefit.highlightFeature ? 'font-medium' : ''}`}>
                  {benefit.name}
                </span>
                {!benefit.included && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    Premium
                  </Badge>
                )}
              </li>
            ))}
          </ul>

          {!userProfile.redeemed_at && userProfile.user_type === 'student' && (
            <Alert variant="destructive" className="mt-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Account Not Activated</AlertTitle>
              <AlertDescription>
                Your student account needs to be activated with a redemption code.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      {showRedeemButton && userProfile.user_type === 'student' && !userProfile.redeemed_at && (
        <CardFooter className="flex justify-end bg-gray-50 border-t">
          <Button onClick={onRedeemClick} variant="default">
            Redeem Activation Code
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserBenefitsCard;
