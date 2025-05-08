
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface EmployerStats {
  jobsPosted: number; 
  hires: number;
  applications: number;
}

interface EmployerStatsHookResult {
  employerStats: EmployerStats;
  isLoading: boolean;
  error: Error | null;
}

export function useEmployerStats(user: User | null, isEmployer: boolean): EmployerStatsHookResult {
  const [employerStats, setEmployerStats] = useState<EmployerStats>({ 
    jobsPosted: 0, 
    hires: 0, 
    applications: 0 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (user && isEmployer) {
      fetchEmployerStats();
    }
  }, [user, isEmployer]);
  
  const fetchEmployerStats = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get jobs posted count
      const { count: jobsCount, error: jobsError } = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('employer_id', user.id);
      
      if (jobsError) throw jobsError;
      
      // Get hires count
      const { count: hiresCount, error: hiresError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact', head: true })
        .eq('employer_id', user.id)
        .eq('status', 'hired');
      
      if (hiresError) throw hiresError;
      
      // Get applications count
      const { count: applicationsCount, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact', head: true })
        .eq('employer_id', user.id);
      
      if (applicationsError) throw applicationsError;
      
      setEmployerStats({
        jobsPosted: jobsCount || 0,
        hires: hiresCount || 0,
        applications: applicationsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching employer stats:', error);
      setError(error instanceof Error ? error : new Error('Failed to fetch employer stats'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return { employerStats, isLoading, error };
}
