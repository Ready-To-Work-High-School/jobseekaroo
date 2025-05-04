
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useCeoStatus() {
  const { userProfile } = useAuth();
  const [isCeo, setIsCeo] = useState(false);

  useEffect(() => {
    // In a real app, you would check if the user is a CEO from the user profile
    // For now, we'll use various indicators to determine CEO status
    const checkCeoStatus = () => {
      // Check if user is admin
      const isAdmin = userProfile?.user_type === 'admin';
      
      // Check if job title or company name contains CEO indicators
      const isCeoByTitle = userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
                          userProfile?.job_title?.toLowerCase()?.includes('chief executive');
      const isCeoByCompany = userProfile?.company_name?.toLowerCase()?.includes('ceo');
      
      // Check email domains that might indicate CEO status (for demo purposes)
      const isCeoByEmail = userProfile?.email?.toLowerCase()?.includes('ceo') ||
                          userProfile?.email?.toLowerCase()?.includes('founder');
      
      // Set CEO status based on admin rights AND CEO indicators in profile
      // Making this more restrictive by requiring both admin status AND CEO indicators
      if (isAdmin && (isCeoByTitle || isCeoByCompany || isCeoByEmail)) {
        setIsCeo(true);
      } else {
        setIsCeo(false);
      }
    };

    checkCeoStatus();
  }, [userProfile]);

  return {
    isCeo
  };
}
