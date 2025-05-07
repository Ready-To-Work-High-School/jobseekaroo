
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
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id);
      
      if (jobsError) throw jobsError;
      
      // Get hires count
      const { data: hiresData, error: hiresError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id)
        .eq('status', 'hired');
      
      if (hiresError) throw hiresError;
      
      // Get applications count
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id);
      
      if (applicationsError) throw applicationsError;
      
      setEmployerStats({
        jobsPosted: jobsData?.length || 0,
        hires: hiresData?.length || 0,
        applications: applicationsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching employer stats:', error);
    }
  };
  
  return { employerStats };
}
