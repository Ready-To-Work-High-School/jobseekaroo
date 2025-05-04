
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useAdminStatus() {
  const { userProfile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCeo, setIsCeo] = useState(false);
  
  useEffect(() => {
    // Debug log
    console.log('useAdminStatus hook - checking profile:', userProfile);
    
    // Check admin status
    if (userProfile?.user_type === 'admin') {
      setIsAdmin(true);
      console.log('useAdminStatus: User is admin');
    } else {
      setIsAdmin(false);
      console.log('useAdminStatus: User is not admin');
    }
    
    // Check CEO status - must be admin first AND have the CEO email
    if (userProfile?.user_type === 'admin' && 
        userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase()) {
      setIsCeo(true);
      console.log('useAdminStatus: User is CEO');
    } else {
      setIsCeo(false);
      console.log('useAdminStatus: User is not CEO');
    }
  }, [userProfile]);
  
  return {
    isAdmin,
    isCeo,
    hasAdminAccess: isAdmin || isCeo
  };
}
