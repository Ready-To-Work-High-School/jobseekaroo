
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
    
    // Check CEO status - admin with specific CEO markers
    // CEO can be determined by multiple conditions:
    // 1. Admin user with CEO_EMAIL environment variable match
    // 2. Admin user with redeemed code (CEO redemption)
    // 3. Admin user with special job title containing "CEO" or "Chief Executive"
    // 4. Admin user with company name containing "CEO"
    if (userProfile?.user_type === 'admin') {
      // Check for CEO email match (primary determinant)
      const isCeoByEmail = userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase();
      
      // Check for CEO in job title
      const isCeoByTitle = userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
                          userProfile?.job_title?.toLowerCase()?.includes('chief executive');
      
      // Check for CEO in company name
      const isCeoByCompany = userProfile?.company_name?.toLowerCase()?.includes('ceo');
      
      // Check for CEO by special redemption
      const isCeoByRedemption = userProfile?.redeemed_at && userProfile?.redeemed_code?.startsWith('CEO-');
      
      // Set CEO status if any conditions match
      if (isCeoByEmail || isCeoByTitle || isCeoByCompany || isCeoByRedemption) {
        setIsCeo(true);
        console.log('useAdminStatus: User is CEO');
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
