
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const AccountTypeBadge: React.FC = () => {
  const { userProfile } = useAuth();
  
  if (!userProfile) return null;
  
  let badgeText = 'User';
  let badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  
  if (userProfile.is_employer) {
    badgeText = 'Employer';
    badgeVariant = 'secondary';
  } else if (userProfile.is_admin) {
    badgeText = 'Admin';
    badgeVariant = 'destructive';
  } else if (userProfile.is_school_admin) {
    badgeText = 'School Admin';
    badgeVariant = 'outline';
  }
  
  // Use environment variables with proper Vite format
  // Replace process.env with import.meta.env
  const isDevelopment = import.meta.env.DEV === true;
  
  return (
    <Badge variant={badgeVariant} className="ml-2">
      {badgeText}
      {isDevelopment && ' (Dev)'}
    </Badge>
  );
};

export default AccountTypeBadge;
