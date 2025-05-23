
import { useAuth } from '@/contexts/auth';

export const useAdminStatus = () => {
  const { userProfile } = useAuth();
  
  const isAdmin = userProfile?.user_type === 'admin';
  const isCeo = userProfile?.user_type === 'ceo' || userProfile?.user_type === 'admin';
  
  return {
    isAdmin,
    isCeo
  };
};
