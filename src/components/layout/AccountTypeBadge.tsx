
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';
import { User, School, Briefcase, Shield, ShieldCheck } from 'lucide-react';
import { useAdminStatus } from '@/hooks/useAdminStatus';

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

  // Use proper CEO check
  const isAdmin = userProfile.user_type === 'admin';
  const isCeoByEmail = userProfile.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase();
  const isCeo = isAdmin && isCeoByEmail;

  const getBadgeContent = () => {
    switch (userProfile.user_type) {
      case 'student':
        return {
          text: 'Student',
          icon: <User className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
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
        if (isCeo) {
          return {
            text: 'Chief Executive Officer',
            icon: <ShieldCheck className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'} text-amber-400`} />,
            variant: 'outline',
            className: 'bg-gradient-to-r from-purple-800 via-blue-700 to-amber-600 text-white hover:bg-black/90'
          };
        }
        return {
          text: 'Admin',
          icon: <Shield className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
          variant: 'outline',
          className: 'bg-black text-white hover:bg-black/90'
        };
      case 'teacher':
        return {
          text: 'Teacher',
          icon: <School className={`${showText ? 'h-3 w-3 mr-1' : 'h-4 w-4'}`} />,
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
