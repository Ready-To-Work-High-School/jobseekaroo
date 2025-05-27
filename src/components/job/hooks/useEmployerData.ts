
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Employer, EmployerDataResult } from './types';
import { enhanceEmployerData } from '../utils/employerDataUtils';
import { getFallbackEmployerData } from '../data/fallbackEmployerData';

/**
 * Hook that fetches and manages employer data
 */
export const useEmployerData = (): EmployerDataResult => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopEmployers = async () => {
    setLoading(true);
    
    try {
      console.log('Fetching top employers data...');
      
      // Try the edge function first
      const response = await supabase.functions.invoke('get-employer-stats');
      
      console.log('Edge function response:', response);
      
      if (response.error) {
        console.error("Error from function:", response.error);
        throw new Error(response.error.message || 'Error fetching data from edge function');
      }
      
      if (!response.data || !response.data.employers) {
        console.log("No data returned from function, trying direct database query");
        
        // Fallback to direct database query
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('company_name, pay_rate_min')
          .not('company_name', 'is', null);
        
        if (jobsError) {
          console.error('Direct database query error:', jobsError);
          throw new Error('Failed to fetch jobs data');
        }
        
        // Process jobs data manually
        const employerStats = new Map();
        
        if (jobsData && jobsData.length > 0) {
          jobsData.forEach(job => {
            const companyName = job.company_name;
            const wage = job.pay_rate_min || 0;
            
            if (employerStats.has(companyName)) {
              const existing = employerStats.get(companyName);
              existing.job_count += 1;
              existing.total_wage += wage;
              existing.avg_min_wage = existing.total_wage / existing.job_count;
            } else {
              employerStats.set(companyName, {
                company_name: companyName,
                job_count: 1,
                total_wage: wage,
                avg_min_wage: wage,
                last_updated: new Date().toISOString()
              });
            }
          });
          
          const processedData = Array.from(employerStats.values())
            .map(employer => ({
              company_name: employer.company_name,
              job_count: employer.job_count,
              avg_min_wage: employer.avg_min_wage,
              last_updated: employer.last_updated
            }))
            .sort((a, b) => b.job_count - a.job_count)
            .slice(0, 10);
          
          console.log('Processed data from direct query:', processedData);
          const enhancedData = enhanceEmployerData(processedData);
          setEmployers(enhancedData);
          return;
        }
        
        throw new Error('No jobs data available');
      }
      
      const data = response.data.employers;
      console.log('Received employer data from edge function:', data);
      
      const enhancedData = enhanceEmployerData(data);
      setEmployers(enhancedData);
    } catch (error) {
      console.error("Error fetching top employers:", error);
      
      // Use fallback data and show a less intrusive message
      console.log('Using fallback employer data');
      setEmployers(getFallbackEmployerData());
      
      // Only show toast in development or for debugging
      if (process.env.NODE_ENV === 'development') {
        toast.error("Using sample employer data", {
          duration: 3000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set up realtime listener for job changes
    const channel = supabase
      .channel('employer-job-counts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        () => {
          console.log('Job data changed, refreshing employer stats');
          fetchTopEmployers();
        }
      )
      .subscribe();

    // Initial data fetch
    fetchTopEmployers();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { employers, loading };
};
