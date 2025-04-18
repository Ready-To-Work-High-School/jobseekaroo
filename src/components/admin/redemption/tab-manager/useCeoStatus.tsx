
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useCeoStatus() {
  const { userProfile } = useAuth();
  const [isCeo, setIsCeo] = useState(false);

  useEffect(() => {
    // In a real app, you would check if the user is a CEO from the user profile
    // For now, we'll use admin as proxy for CEO
    const checkCeoStatus = () => {
      if (userProfile?.user_type === 'admin' || userProfile?.role === 'ceo') {
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
