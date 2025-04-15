import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Sparkles, Crown } from 'lucide-react';
import { UserProfile } from '@/types/user';

interface UserBenefitsCardProps {
  userProfile: UserProfile | null;
}

const UserBenefitsCard: React.FC<UserBenefitsCardProps> = ({ userProfile }) => {
  // Determine the account type for displaying benefits
  const accountType = userProfile?.user_type || 'basic';
  
  // Check if user has premium subscription
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  // Format date to readable string
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Check if user has founding member badge
  const isFoundingMember = userProfile?.badges?.some(
    (badge: any) => badge.id === 'founding_member'
  );
  
  // Define benefits based on account type
  const getBenefits = () => {
    switch (accountType) {
      case 'student':
        return [
          { name: 'Access to premium job listings', active: true },
          { name: 'Resume builder tools', active: true },
          { name: 'Interview preparation resources', active: true },
          { name: 'Skill assessment tools', active: true },
          { name: 'Career coaching sessions', active: false, comingSoon: true }
        ];
      case 'employer':
        if (hasPremium) {
          return [
            { name: 'Post unlimited job listings', active: true },
            { name: 'Advanced candidate search', active: true },
            { name: 'Premium analytics and reporting tools', active: true, premium: true },
            { name: 'Featured company profile', active: true, premium: true },
            { name: 'AI-powered candidate matching', active: true, premium: true },
            { name: 'Competitor benchmarking', active: true, premium: true },
            { name: 'Custom report generation', active: true, premium: true },
            { name: 'Priority support', active: true, premium: true }
          ];
        } else {
          return [
            { name: 'Post unlimited job listings', active: true },
            { name: 'Basic candidate search', active: true },
            { name: 'Basic analytics and reporting tools', active: true },
            { name: 'Standard company profile', active: true },
            { name: 'Premium analytics and reporting', active: false, locked: true },
            { name: 'Featured company profile', active: false, locked: true },
            { name: 'AI-powered candidate matching', active: false, locked: true }
          ];
        }
      case 'admin':
        return [
          { name: 'Full platform administration', active: true },
          { name: 'User management access', active: true },
          { name: 'Content moderation tools', active: true },
          { name: 'Analytics dashboard', active: true },
          { name: 'System configuration', active: true },
          { name: 'Executive decision making', active: true }
        ];
      case 'teacher':
        return [
          { name: 'Student progress tracking', active: true },
          { name: 'Career pathway management', active: true },
          { name: 'Employer connection tools', active: true },
          { name: 'Curriculum resources', active: true },
          { name: 'Student assessment tools', active: true }
        ];
      default:
        return [
          { name: 'Basic job search', active: true },
          { name: 'Create a profile', active: true },
          { name: 'Save job listings', active: true },
          { name: 'Premium features', active: false, locked: true }
        ];
    }
  };

  const getAccountBadge = () => {
    switch (accountType) {
      case 'student':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Student</Badge>;
      case 'employer':
        return hasPremium ? (
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Employer</Badge>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Premium
            </Badge>
          </div>
        ) : (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Employer</Badge>
        );
      case 'admin':
        return <Badge className="bg-black text-white hover:bg-black">Chief Executive Officer</Badge>;
      case 'teacher':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Teacher</Badge>;
      default:
        return <Badge variant="outline">Basic</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Account Benefits</CardTitle>
          {getAccountBadge()}
        </div>
        <CardDescription>
          Your current account features and benefits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isFoundingMember && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-900">Founding Member</span>
              </div>
              <p className="text-sm text-amber-800 mt-1">
                One of our earliest employer partners, helping shape the future of student employment.
              </p>
            </div>
          )}
          
          <ul className="space-y-2">
            {getBenefits().map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                {benefit.active ? (
                  benefit.premium ? (
                    <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  )
                ) : benefit.comingSoon ? (
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <span className={benefit.active ? "" : "text-muted-foreground"}>
                  {benefit.name}
                  {benefit.comingSoon && (
                    <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                  )}
                  {benefit.locked && (
                    <Badge variant="outline" className="ml-2 text-xs">Premium</Badge>
                  )}
                  {benefit.premium && (
                    <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">Premium</Badge>
                  )}
                </span>
              </li>
            ))}
          </ul>
          
          {accountType !== 'basic' && userProfile?.redeemed_at && (
            <div className="text-sm text-muted-foreground pt-2 border-t">
              <p>Account upgraded on {formatDate(userProfile.redeemed_at)}</p>
            </div>
          )}
          
          {hasPremium && (
            <div className="text-sm text-muted-foreground pt-2 border-t">
              <p className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Premium subscription active
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBenefitsCard;
