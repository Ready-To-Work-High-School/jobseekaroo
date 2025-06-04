
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useAdminStatus = () => {
  const { user, userProfile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCeo, setIsCeo] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setIsAdmin(userProfile.user_type === 'admin');
      setIsCeo(userProfile.user_type === 'admin' && userProfile.company_name?.toLowerCase().includes('ceo'));
    } else {
      setIsAdmin(false);
      setIsCeo(false);
    }
  }, [userProfile]);

  return { isAdmin, isCeo };
};
