
import { useAuth } from '@/contexts/auth';

export const useAdminStatus = () => {
  const { userProfile } = useAuth();
  
  // Debug logging
  console.log("useAdminStatus - userProfile:", userProfile);
  console.log("useAdminStatus - user_type:", userProfile?.user_type);
  
  const isAdmin = userProfile?.user_type === 'admin';
  const isCeo = userProfile?.user_type === 'admin'; // CEO is a type of admin
  
  console.log("useAdminStatus - isAdmin:", isAdmin);
  console.log("useAdminStatus - isCeo:", isCeo);
  
  return {
    isAdmin,
    isCeo
  };
};
