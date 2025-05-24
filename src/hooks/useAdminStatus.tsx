
import { useAuth } from '@/contexts/auth';

export const useAdminStatus = () => {
  const { userProfile } = useAuth();
  
  const isAdmin = userProfile?.user_type === 'admin';
  const isCeo = userProfile?.user_type === 'admin'; // CEO is a type of admin
  
  return {
    isAdmin,
    isCeo
  };
};
