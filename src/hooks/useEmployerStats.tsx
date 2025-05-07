
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface EmployerStats {
  jobsPosted: number;
  hires: number;
  applications: number;
}

export function useEmployerStats(user: User | null, isEmployer: boolean) {
  const [employerStats, setEmployerStats] = useState<EmployerStats>({ 
    jobsPosted: 0, 
    hires: 0, 
    applications: 0 
  });
  
  useEffect(() => {
    if (user && isEmployer) {
      fetchEmployerStats();
    }
  }, [user, isEmployer]);
  
  const fetchEmployerStats = async () => {
    if (!user) return;
    
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
    }
  };
  
  return { employerStats };
}
