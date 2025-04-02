
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { UserProfile } from '@/types/user';

interface UserBenefitsCardProps {
  userProfile: UserProfile | null;
}

const UserBenefitsCard: React.FC<UserBenefitsCardProps> = ({ userProfile }) => {
  // Determine the account type for displaying benefits
  const accountType = userProfile?.user_type || 'basic';
  
  // Format date to readable string
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
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
        return [
          { name: 'Post unlimited job listings', active: true },
          { name: 'Advanced candidate search', active: true },
          { name: 'Analytics and reporting tools', active: true },
          { name: 'Featured company profile', active: true },
          { name: 'AI-powered candidate matching', active: false, comingSoon: true }
        ];
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Employer</Badge>;
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
          <ul className="space-y-2">
            {getBenefits().map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                {benefit.active ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
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
                </span>
              </li>
            ))}
          </ul>
          
          {accountType !== 'basic' && userProfile?.redeemed_at && (
            <div className="text-sm text-muted-foreground pt-2 border-t">
              <p>Account upgraded on {formatDate(userProfile.redeemed_at)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBenefitsCard;
