
import { useAuth } from '@/contexts/AuthContext';

export const useCeoStatus = () => {
  const { userProfile } = useAuth();
  
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
                userProfile?.job_title?.toLowerCase().includes('chief executive') ||
                userProfile?.company_name?.toLowerCase().includes('ceo');
  
  return { isCeo };
};
