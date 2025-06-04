import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useNavigation = () => {
  const { user, userProfile, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Debug log for admin status
  console.log('MainNavigation - user type:', userProfile?.user_type);

  useEffect(() => {
    if (userProfile && userProfile.user_type === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userProfile]);
  
  return {
    user,
    userProfile,
    isAdmin,
    signOut
  };
};
