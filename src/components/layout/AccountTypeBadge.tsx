
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';

interface AccountTypeBadgeProps {
  userProfile?: UserProfile;
  className?: string;
  showText?: boolean;
}

const AccountTypeBadge: React.FC<AccountTypeBadgeProps> = ({ 
  userProfile: propUserProfile,
  className = '',
  showText = true
}) => {
  const { userProfile: contextUserProfile } = useAuth();
  const userProfile = propUserProfile || contextUserProfile;
  
  if (!userProfile) return null;
  
  let badgeText = 'User';
  let badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  
  if (userProfile.user_type === 'employer') {
    badgeText = 'Employer';
    badgeVariant = 'secondary';
  } else if (userProfile.user_type === 'admin') {
    badgeText = 'Admin';
    badgeVariant = 'destructive';
  } else if (userProfile.user_type === 'teacher') {
    badgeText = 'School Admin';
    badgeVariant = 'outline';
  }
  
  // Use environment variables with proper Vite format
  const isDevelopment = import.meta.env.DEV === true;
  
  return (
    <Badge 
      variant={badgeVariant} 
      className={`${!showText ? 'p-0' : 'ml-2'} ${className}`}
    >
      {showText ? badgeText : ''}
      {isDevelopment && showText && ' (Dev)'}
    </Badge>
  );
};

export default AccountTypeBadge;
