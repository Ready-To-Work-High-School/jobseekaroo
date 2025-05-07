
import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { UserProfile } from '@/types/user';

export function useProfileStatus(userProfile: UserProfile | null) {
  // Check if user is CEO based on job title or company name
  const isCeo = useMemo(() => {
    return userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
           userProfile?.job_title?.toLowerCase()?.includes('chief executive') ||
           userProfile?.company_name?.toLowerCase()?.includes('ceo');
  }, [userProfile]);
  
  // Check if user is admin as well (for CEO portal access)
  const isAdmin = userProfile?.user_type === 'admin';
  const isEmployer = userProfile?.user_type === 'employer';
  const showCeoIcon = isCeo && isAdmin;

  // Calculate account age
  const accountAge = useMemo(() => {
    return userProfile?.created_at 
      ? formatDistanceToNow(new Date(userProfile.created_at), { addSuffix: false })
      : 'Unknown';
  }, [userProfile?.created_at]);
  
  // Check if user signed up for the 2025-2026 year
  const isInceptionMember = useMemo(() => {
    return userProfile?.created_at
      ? new Date(userProfile.created_at) >= new Date('2025-01-01') && 
        new Date(userProfile.created_at) <= new Date('2026-12-31')
      : false;
  }, [userProfile?.created_at]);
  
  return {
    isCeo,
    isAdmin,
    isEmployer,
    showCeoIcon,
    accountAge,
    isInceptionMember
  };
}
