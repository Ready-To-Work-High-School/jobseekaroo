
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
      const jobsResponse = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: false })
        .eq('employer_id', user.id);
      
      const jobsCount = jobsResponse.count || 0;
      
      // Get hires count
      const hiresResponse = await supabase
        .from('job_applications')
        .select('id', { count: 'exact', head: false })
        .eq('employer_id', user.id)
        .eq('status', 'hired');
      
      const hiresCount = hiresResponse.count || 0;
      
      // Get applications count
      const applicationsResponse = await supabase
        .from('job_applications')
        .select('id', { count: 'exact', head: false })
        .eq('employer_id', user.id);
      
      const applicationsCount = applicationsResponse.count || 0;
      
      setEmployerStats({
        jobsPosted: jobsCount,
        hires: hiresCount,
        applications: applicationsCount,
      });
    } catch (error) {
      console.error('Error fetching employer stats:', error);
    }
  };
  
  return { employerStats };
}
