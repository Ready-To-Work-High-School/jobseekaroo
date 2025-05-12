
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';

interface AccountTypeBadgeProps {
  userProfile?: UserProfile | null;
  className?: string;
  showText?: boolean;
}

const AccountTypeBadge: React.FC<AccountTypeBadgeProps> = ({ userProfile: propUserProfile, className, showText = true }) => {
  const { userProfile: contextUserProfile } = useAuth();
  
  // Use provided userProfile prop or fall back to the one from context
  const userProfile = propUserProfile || contextUserProfile;
  
  if (!userProfile?.user_type) {
    return null;
  }
  
  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'admin':
        return 'Admin';
      case 'employer':
        return 'Employer';
      case 'student':
        return 'Student';
      case 'school':
        return 'School';
      case 'counselor':
        return 'Counselor';
      default:
        return 'User';
    }
  };
  
  const getUserTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'admin':
        return 'destructive';
      case 'employer':
        return 'secondary';
      case 'student':
        return 'default';
      case 'school':
        return 'outline';
      case 'counselor':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  const label = getUserTypeLabel(userProfile.user_type);
  const variant = getUserTypeBadgeVariant(userProfile.user_type);
  
  return (
    <Badge 
      variant={variant as any} 
      className={className}
    >
      {showText ? label : ''}
    </Badge>
  );
};

export default AccountTypeBadge;
