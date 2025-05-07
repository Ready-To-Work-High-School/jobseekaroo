
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Fixed import path

export function useAdminStatus() {
  const { userProfile, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCeo, setIsCeo] = useState(false);
  
  useEffect(() => {
    // Debug log
    console.log('useAdminStatus hook - checking profile:', userProfile);
    console.log('useAdminStatus hook - checking user metadata:', user?.user_metadata);
    
    // Primary check: user_type from profile
    if (userProfile?.user_type === 'admin') {
      setIsAdmin(true);
      console.log('useAdminStatus: User is admin (from profile)');
    } 
    // Fallback check: user_type from user metadata
    else if (user?.user_metadata?.user_type === 'admin') {
      setIsAdmin(true);
      console.log('useAdminStatus: User is admin (from user metadata)');
    }
    // Testing flag check: URL parameter for development/testing
    else if (window.location.search.includes('adminTest=true')) {
      setIsAdmin(true);
      console.log('useAdminStatus: Admin test mode enabled via URL parameter');
    } 
    else {
      setIsAdmin(false);
      console.log('useAdminStatus: User is not admin');
    }
    
    // CEO status check
    const isCeoByEmail = userProfile?.email === import.meta.env.VITE_CEO_EMAIL || 
                         user?.email === import.meta.env.VITE_CEO_EMAIL;
    
    if (isCeoByEmail && isAdmin) {
      setIsCeo(true);
      console.log('useAdminStatus: User is CEO with full access');
    } else {
      setIsCeo(false);
      console.log('useAdminStatus: User is not CEO');
    }
  }, [userProfile, user, isAdmin]);
  
  return {
    isAdmin,
    isCeo,
    hasAdminAccess: isAdmin || isCeo
  };
}
