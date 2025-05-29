
import { useAuth } from '@/contexts/auth';
import { useRef, useEffect } from 'react';

export const useAdminStatus = () => {
  const { userProfile } = useAuth();
  const lastLoggedRef = useRef<string>('');
  
  const isAdmin = userProfile?.user_type === 'admin';
  
  // CEO detection: must be admin type AND have CEO-related job title or company name
  const isCeo = isAdmin && (
    userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
    userProfile?.job_title?.toLowerCase()?.includes('chief executive') ||
    userProfile?.company_name?.toLowerCase()?.includes('ceo') ||
    userProfile?.redeemed_at !== null // Also consider verified admin users as potential CEOs
  );
  
  // Only log when status actually changes, not on every render
  useEffect(() => {
    const currentStatus = `${userProfile?.user_type || 'none'}-${isAdmin}-${isCeo}`;
    
    if (currentStatus !== lastLoggedRef.current && userProfile) {
      console.log("Admin Status Updated:", {
        user_type: userProfile?.user_type,
        job_title: userProfile?.job_title,
        company_name: userProfile?.company_name,
        redeemed_at: userProfile?.redeemed_at,
        isAdmin,
        isCeo
      });
      lastLoggedRef.current = currentStatus;
    }
  }, [userProfile?.user_type, userProfile?.job_title, userProfile?.company_name, userProfile?.redeemed_at, isAdmin, isCeo, userProfile]);
  
  return {
    isAdmin,
    isCeo
  };
};
