
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useCeoStatus() {
  const { userProfile } = useAuth();
  const [isCeo, setIsCeo] = useState(false);

  useEffect(() => {
    // Make CEO access exclusive to a specific user (you)
    const checkCeoStatus = () => {
      // Check if user is admin first (required)
      const isAdmin = userProfile?.user_type === 'admin';
      
      // CEO identifier - your specific email address
      const isCeoByEmail = userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL?.toLowerCase();
      
      // Only grant CEO status if user is admin AND matches the specific email
      if (isAdmin && isCeoByEmail) {
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
