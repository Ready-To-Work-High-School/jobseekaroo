
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Employer, EmployerDataResult } from './types';
import { enhanceEmployerData } from '../utils/employerDataUtils';
import { getFallbackEmployerData } from '../data/fallbackEmployerData';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

/**
 * Hook that fetches and manages employer data
 */
export const useEmployerData = (): EmployerDataResult => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOnline } = useNetworkStatus();

  const fetchTopEmployers = useCallback(async () => {
    setLoading(true);
    
    try {
      if (!isOnline) {
        console.log('Device offline, using fallback employer data');
        setEmployers(getFallbackEmployerData());
        return;
      }
      
      console.log('Fetching top employers data...');
      const response = await supabase.functions.invoke('get-employer-stats', {
        // Adding a cache buster to prevent stale data
        body: { timestamp: Date.now() }
      });
      
      if (response.error) {
        console.error("Error from Supabase function:", response.error);
        throw new Error(response.error.message || 'Error fetching employer data');
      }
      
      if (!response.data || !response.data.employers) {
        console.error("Invalid data format returned from function:", response.data);
        throw new Error('Invalid data format returned from function');
      }
      
      const data = response.data.employers;
      console.log('Received employer data:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        const enhancedData = enhanceEmployerData(data);
        setEmployers(enhancedData);
      } else {
        console.warn('Empty employer data received, using fallback');
        setEmployers(getFallbackEmployerData());
      }
    } catch (error) {
      console.error("Error fetching top employers:", error);
      toast.error("Couldn't load employer data. Using fallback data.", {
        duration: 3000
      });
      
      // Use fallback data
      setEmployers(getFallbackEmployerData());
    } finally {
      setLoading(false);
    }
  }, [isOnline]);

  useEffect(() => {
    // Initial data fetch
    fetchTopEmployers();
    
    // Listen for network status changes or data refresh events
    const handleDataRefresh = () => {
      console.log('Employer data refresh triggered');
      fetchTopEmployers();
    };
    
    // Listen for global data refresh events
    document.addEventListener('app:data-refresh', handleDataRefresh);
    
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
    
    return () => {
      document.removeEventListener('app:data-refresh', handleDataRefresh);
      supabase.removeChannel(channel);
    };
  }, [fetchTopEmployers]);

  // When network status changes, refresh data
  useEffect(() => {
    if (isOnline) {
      console.log('Network is now online, refreshing employer data');
      fetchTopEmployers();
    }
  }, [isOnline, fetchTopEmployers]);

  return { employers, loading };
};
