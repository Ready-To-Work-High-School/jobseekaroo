
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';
import { GraduationCap, Briefcase, ShieldCheck, BookOpen, User } from 'lucide-react';

interface AccountTypeBadgeProps {
  userProfile: UserProfile | null;
  className?: string;
}

const AccountTypeBadge: React.FC<AccountTypeBadgeProps> = ({ userProfile, className = '' }) => {
  if (!userProfile || !userProfile.user_type) return null;

  const getBadgeContent = () => {
    switch (userProfile.user_type) {
      case 'student':
        return {
          text: 'Student',
          icon: <GraduationCap className="h-3 w-3 mr-1" />,
          variant: userProfile.redeemed_at ? 'default' : 'outline'
        };
      case 'employer':
        return {
          text: 'Employer',
          icon: <Briefcase className="h-3 w-3 mr-1" />,
          variant: userProfile.redeemed_at ? 'default' : 'outline'
        };
      case 'admin':
        return {
          text: 'Admin',
          icon: <ShieldCheck className="h-3 w-3 mr-1" />,
          variant: 'default'
        };
      case 'teacher':
        return {
          text: 'Teacher',
          icon: <BookOpen className="h-3 w-3 mr-1" />,
          variant: userProfile.redeemed_at ? 'default' : 'outline'
        };
      default:
        return {
          text: 'Basic',
          icon: <User className="h-3 w-3 mr-1" />,
          variant: 'outline'
        };
    }
  };

  const badge = getBadgeContent();

  return (
    <Badge variant={badge.variant as any} className={`flex items-center text-xs ${className}`}>
      {badge.icon}
      {badge.text}
    </Badge>
  );
};

export default AccountTypeBadge;
