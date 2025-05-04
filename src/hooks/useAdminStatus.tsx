
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useAdminStatus() {
  const { userProfile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCeo, setIsCeo] = useState(false);
  
  useEffect(() => {
    // Check admin status
    if (userProfile?.user_type === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    
    // Check CEO status - must be admin first AND have the CEO email
    if (userProfile?.user_type === 'admin' && 
        userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase()) {
      setIsCeo(true);
    } else {
      setIsCeo(false);
    }
  }, [userProfile]);
  
  return {
    isAdmin,
    isCeo,
    hasAdminAccess: isAdmin || isCeo
  };
}
