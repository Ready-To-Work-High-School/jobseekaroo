
import { useAuth } from '@/hooks/useAuth';

export function useCeoStatus() {
  const { userProfile } = useAuth();
  
  const isCeo = !!userProfile && (
    userProfile.email?.endsWith('@ceo.westsidehigh.edu') || 
    userProfile.email?.endsWith('@executive.westsidehigh.edu') ||
    userProfile.company_name?.includes('CEO') ||
    userProfile.job_title?.toLowerCase().includes('ceo') ||
    userProfile.job_title?.toLowerCase().includes('chief executive')
  );

  return { isCeo };
}
