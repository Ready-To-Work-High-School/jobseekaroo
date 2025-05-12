
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface AccountTypeBadgeProps {
  className?: string;
}

const AccountTypeBadge: React.FC<AccountTypeBadgeProps> = ({ className }) => {
  const { userProfile } = useAuth();
  
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
      {label}
    </Badge>
  );
};

export default AccountTypeBadge;
