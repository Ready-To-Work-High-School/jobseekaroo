
import { useQuery } from '@tanstack/react-query';
import { getEmployerJobStats } from '@/lib/supabase/jobs';

export const useEmployerStats = (employerId: string) => {
  return useQuery({
    queryKey: ['employerStats', employerId],
    queryFn: () => getEmployerJobStats(employerId),
    enabled: !!employerId,
  });
};
