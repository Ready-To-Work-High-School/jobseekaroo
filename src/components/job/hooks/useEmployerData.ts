
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
      const response = await supabase.functions.invoke('get-employer-stats');
      
      if (response.error) {
        console.error("Error from function:", response.error);
        throw new Error(response.error.message || 'Error fetching data');
      }
      
      if (!response.data) {
        console.error("No data returned from function");
        throw new Error('No data returned from function');
      }
      
      const data = response.data.employers;
      console.log('Received employer data:', data);
      
      const enhancedData = enhanceEmployerData(data);
      setEmployers(enhancedData);
    } catch (error) {
      console.error("Error fetching top employers:", error);
      toast.error("Couldn't load employer data. Using fallback data.", {
        duration: 3000
      });
      
      // Use fallback data after a short delay
      setTimeout(() => {
        setEmployers(getFallbackEmployerData());
      }, 300);
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
