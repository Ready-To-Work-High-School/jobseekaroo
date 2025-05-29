
import { useAuth } from '@/contexts/auth';
import { useRef, useEffect } from 'react';

export const useAdminStatus = () => {
  const { userProfile } = useAuth();
  const lastLoggedRef = useRef<string>('');
  
  const isAdmin = userProfile?.user_type === 'admin';
  const isCeo = userProfile?.user_type === 'admin'; // CEO is a type of admin
  
  // Only log when status actually changes, not on every render
  useEffect(() => {
    const currentStatus = `${userProfile?.user_type || 'none'}-${isAdmin}-${isCeo}`;
    
    if (currentStatus !== lastLoggedRef.current && userProfile) {
      console.log("Admin Status Updated:", {
        user_type: userProfile?.user_type,
        isAdmin,
        isCeo
      });
      lastLoggedRef.current = currentStatus;
    }
  }, [userProfile?.user_type, isAdmin, isCeo, userProfile]);
  
  return {
    isAdmin,
    isCeo
  };
};
