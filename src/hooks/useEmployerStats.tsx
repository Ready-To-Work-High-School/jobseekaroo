
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEmployerJobStats } from '@/lib/supabase/jobs';

interface EmployerStats {
  jobsPosted: number;
  hires: number;
  applications: number;
}

export const useEmployerStats = (employerId: string | undefined) => {
  const [stats, setStats] = useState<EmployerStats>({
    jobsPosted: 0,
    hires: 0,
    applications: 0
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employerStats', employerId],
    queryFn: async () => {
      if (!employerId) {
        throw new Error('Employer ID is required');
      }
      return await getEmployerJobStats(employerId);
    },
    enabled: !!employerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setStats({
        jobsPosted: data.jobsPosted || 0,
        hires: data.hires || 0,
        applications: data.applications || 0
      });
    }
  }, [data]);

  return {
    stats,
    isLoading,
    isError,
    error
  };
};
