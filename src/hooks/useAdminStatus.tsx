
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';

export function useAdminStatus() {
  const { userProfile } = useAuth();
  const { isCeo } = useCeoStatus();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    if (userProfile?.user_type === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userProfile]);
  
  return {
    isAdmin,
    isCeo,
    hasAdminAccess: isAdmin || isCeo
  };
}
