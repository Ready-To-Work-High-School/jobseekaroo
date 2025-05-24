
import { useQuery } from '@tanstack/react-query';
import { getEmployerJobStats } from '@/lib/supabase/jobs';

export const useEmployerStats = (employerId: string) => {
  return useQuery({
    queryKey: ['employerStats', employerId],
    queryFn: () => getEmployerJobStats(employerId),
    enabled: !!employerId,
    select: (data) => ({
      data: data,
      stats: data // Add stats property for backward compatibility
    })
  });
};
