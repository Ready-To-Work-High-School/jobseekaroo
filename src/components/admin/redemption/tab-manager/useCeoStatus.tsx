
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
      
      // Specific CEO identifiers - only YOUR identifiers will work
      // Use your specific email or user ID for the strictest control
      const isCeoByEmail = userProfile?.email?.toLowerCase() === 'your.email@example.com'; // Replace with your actual email
      
      // Optional: Check user ID for even more security (uncomment and use your actual user ID)
      // const isCeoById = userProfile?.id === 'your-specific-user-id';
      
      // Only grant CEO status if user is admin AND matches your specific identifiers
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
