
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
    
    // CEO status - only one person gets this, with full access
    // We'll make this determination based ONLY on the CEO_EMAIL environment variable match
    // This is the most secure and controllable method
    if (userProfile?.user_type === 'admin') {
      // Check for CEO email match (ONLY determinant - single source of truth)
      const isCeoByEmail = userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase();
      
      if (isCeoByEmail) {
        setIsCeo(true);
        console.log('useAdminStatus: User is CEO with full access');
      } else {
        setIsCeo(false);
        console.log('useAdminStatus: User is not CEO');
      }
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
