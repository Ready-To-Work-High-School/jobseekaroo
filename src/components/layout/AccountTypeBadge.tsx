
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';
import { GraduationCap, Briefcase, ShieldCheck, BookOpen, User } from 'lucide-react';

interface AccountTypeBadgeProps {
  userProfile: UserProfile | null;
  className?: string;
  showText?: boolean;
}

const AccountTypeBadge: React.FC<AccountTypeBadgeProps> = ({ 
  userProfile, 
  className = '', 
  showText = true 
}) => {
  if (!userProfile || !userProfile.user_type) return null;

  const getBadgeContent = () => {
    switch (userProfile.user_type) {
      case 'student':
        return {
          text: 'Student',
          icon: <GraduationCap className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: userProfile.redeemed_at ? 'default' : 'outline',
          className: 'bg-blue-700 text-white'
        };
      case 'employer':
        return {
          text: 'Employer',
          icon: <Briefcase className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: userProfile.redeemed_at ? 'default' : 'outline',
          className: 'bg-green-700 text-white'
        };
      case 'admin':
        return {
          text: 'Chief Executive Officer',
          icon: <ShieldCheck className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: 'outline',
          className: 'bg-black text-white hover:bg-black/90'
        };
      case 'teacher':
        return {
          text: 'Teacher',
          icon: <BookOpen className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: userProfile.redeemed_at ? 'default' : 'outline',
          className: 'bg-amber-700 text-white'
        };
      default:
        return {
          text: 'Basic',
          icon: <User className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: 'outline',
          className: 'bg-gray-600 text-white'
        };
    }
  };

  const badge = getBadgeContent();

  return (
    <Badge 
      variant={badge.variant as any} 
      className={`flex items-center justify-center ${showText ? 'text-xs' : 'w-6 h-6 p-0'} ${badge.className || ''} ${className}`}
    >
      {badge.icon}
      {showText && badge.text}
    </Badge>
  );
};

export default AccountTypeBadge;
